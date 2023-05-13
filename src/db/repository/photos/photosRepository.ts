import { TAlbums, TablePhotos, albums, photos, userPurchases } from 'db/schema'
import { and, eq, inArray, sql } from 'drizzle-orm'
import {
  IPhotosRepository,
  TGetAlbumPhotosFn,
  TGetAllForAlbumsFn,
  TPhotosWithUser,
  TUserAlbumsAndPhotsFn,
} from './type'
import { CountPagination, SQLTernaryOperator, jsonAggBuildObject } from '../helpers'

export class PhotosRepository extends CountPagination<TablePhotos> implements IPhotosRepository {
  constructor() {
    super(photos)
  }

  getAlbumPhotos: TGetAlbumPhotosFn = async (searchAlbumId, searchUserId, params) => {
    const { limit, offset } = params
    const { albumId, id, name } = this.table

    const maxElementPromise = this.getMaxElementsCount(limit)
    const responseDBPromise = this.db
      .select({
        id,
        album: albums,
        name,
        smallPhotoURL: this.generateSmallPhotoURL(),
        largePhotoURL: this.generateLargePhotoURL(),
      })
      .from(this.table)
      .where(eq(albumId, searchAlbumId))
      .leftJoin(
        userPurchases,
        and(eq(id, userPurchases.photoId), eq(userPurchases.userId, searchUserId))
      )
      .leftJoin(albums, eq(albums.id, albumId))
      .offset(offset)
      .limit(limit)

    const [responseDB, maxPage] = await Promise.all([responseDBPromise, maxElementPromise])

    const album = responseDB[0].album
    const photos = responseDB.map(({ album, ...photo }) => photo)

    return { maxPage, photos, album }
  }

  userAlbumsAndPhotos: TUserAlbumsAndPhotsFn = async (userId) => {
    const { people, albumId, name, id } = this.table

    const albumsAndPhotos = await this.db
      .select({
        photos: jsonAggBuildObject<TPhotosWithUser>({
          id,
          albumId,
          name,
          smallPhotoURL: this.generateSmallPhotoURL(),
          largePhotoURL: this.generateLargePhotoURL(),
        }),
        albums: sql<TAlbums[]>`COALESCE(json_agg(DISTINCT ${albums}), '[]')`,
      })
      .from(this.table)
      .where(inArray(people, [[userId]]))
      .leftJoin(albums, eq(albums.id, albumId))
      .leftJoin(userPurchases, and(eq(id, userPurchases.photoId), eq(userPurchases.userId, userId)))

    return albumsAndPhotos[0]
  }

  private generateLargePhotoURL = () => {
    const { originalUrl, watermarkUrl } = this.table
    return SQLTernaryOperator<string>(userPurchases.photoId, originalUrl, watermarkUrl)
  }

  private generateSmallPhotoURL = () => {
    const { originalResizedUrl, watermarkResizedUrl } = this.table
    return SQLTernaryOperator<string>(
      userPurchases.photoId,
      originalResizedUrl,
      watermarkResizedUrl
    )
  }

  getAllForAlbums: TGetAllForAlbumsFn = async (searchAlbumId) => {
    const { albumId, id } = this.table
    const albumsAndPhotos = await this.db
      .select({ photoId: id })
      .from(this.table)
      .where(eq(albumId, searchAlbumId))
    return albumsAndPhotos
  }
}
