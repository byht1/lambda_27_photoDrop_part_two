import { getDrizzle } from 'db/connectDB'
import { TablePhotos, photos, userPurchases } from 'db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { IPhotosRepository, TGetAlbumPhotosFn } from './type'
import { CountPagination } from '../helpers'

export class PhotosRepository extends CountPagination<TablePhotos> implements IPhotosRepository {
  constructor() {
    super(photos)
  }

  getAlbumPhotos: TGetAlbumPhotosFn = async (searchAlbumId, searchUserId, params) => {
    const { limit, offset } = params
    const {
      albumId,
      originalResizedUrl,
      originalUrl,
      watermarkResizedUrl,
      watermarkUrl,
      id,
      name,
    } = this.table

    const maxElementPromise = this.getMaxElementsCount(limit)
    const photosPromise = this.db
      .select({
        id,
        name,
        smallPhotoURL: sql<string>`CASE WHEN ${userPurchases.photoId} IS NOT NULL THEN ${originalResizedUrl} ELSE ${watermarkResizedUrl} END`,
        largePhotoURL: sql<string>`CASE WHEN ${userPurchases.photoId} IS NOT NULL THEN ${originalUrl} ELSE ${watermarkUrl} END`,
      })
      .from(this.table)
      .where(eq(albumId, searchAlbumId))
      .leftJoin(
        userPurchases,
        and(eq(id, userPurchases.photoId), eq(userPurchases.userId, searchUserId))
      )
      .offset(offset)
      .limit(limit)

    const [photos, maxPage] = await Promise.all([photosPromise, maxElementPromise])

    return { maxPage, photos }
  }
}
