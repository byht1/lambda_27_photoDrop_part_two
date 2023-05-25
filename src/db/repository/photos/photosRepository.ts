import { TablePhotos, albums, photos, userPurchases } from 'db/schema'
import { and, eq, inArray } from 'drizzle-orm'
import {
  IPhotosRepository,
  TAlbumsWithUser,
  TGetAlbumPhotosFn,
  TGetAllForAlbumsFn,
  TGetByIdFn,
  TPhotosWithUser,
  TUserAlbumsAndPhotsFn,
} from './type'
import {
  CountPagination,
  SQLTernaryOperator,
  jsonAggBuildObject,
  uniqJsonAggBuildObject,
} from '../helpers'

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
        photoID: id,
        albumID: albums.id,
        album: {
          albumID: albums.id,
          owner: albums.owner,
          name: albums.name,
          location: albums.location,
          createdAt: albums.createdAt,
        },
        name,
        url: this.generateSmallPhotoURL(),
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

  userAlbumsAndPhotos: TUserAlbumsAndPhotsFn = async (userPhone, userId) => {
    const { people, albumId, name, id } = this.table

    const albumsAndPhotos = await this.db
      .select({
        photos: jsonAggBuildObject<TPhotosWithUser>({
          photoID: id,
          albumID: albumId,
          name,
          url: this.generateSmallPhotoURL(),
          largePhotoURL: this.generateLargePhotoURL(),
        }),
        albums: uniqJsonAggBuildObject<TAlbumsWithUser>({
          albumID: albumId,
          name: albums.name,
          url: this.generateSmallPhotoURL(),
        }),
      })
      .from(this.table)
      .where(inArray(people, [[userPhone]]))
      .leftJoin(albums, eq(albums.id, albumId))
      .leftJoin(userPurchases, and(eq(id, userPurchases.photoId), eq(userPurchases.userId, userId)))

    const { photos, albums: albumsPhotos } = albumsAndPhotos[0]
    const uniqAlbum = albumsPhotos.reduce<TAlbumsWithUser[]>((acc, album) => {
      const { albumID } = album

      const isUniq = acc.find((album) => album.albumID === albumID)
      if (!isUniq) {
        acc.push(album)
      }

      return acc
    }, [])
    // const uniqAlbum = Array.from(new Set(albumsPhotos.map((album) => album.albumID))).map(
    //   (albumID) => albumsPhotos.find((album) => album.albumID === albumID)
    // )

    return { allPhotos: photos, albums: uniqAlbum }
  }

  getById: TGetByIdFn = async (searchPhotoId, searchUserId) => {
    const { id, name, albumId } = this.table
    const photo = await this.db
      .select({
        photoID: id,
        albumID: albumId,
        name,
        url: this.generateSmallPhotoURL(),
        largePhotoURL: this.generateLargePhotoURL(),
      })
      .from(this.table)
      .where(eq(id, searchPhotoId))
      .leftJoin(
        userPurchases,
        and(eq(id, userPurchases.photoId), eq(userPurchases.userId, searchUserId))
      )

    return photo[0]
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
