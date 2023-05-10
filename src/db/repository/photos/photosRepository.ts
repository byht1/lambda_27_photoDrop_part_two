import { getDrizzle } from 'db/connectDB'
import { photos, userPurchases } from 'db/schema'
import { and, eq, sql } from 'drizzle-orm'

export class PhotosRepository {
  private db = getDrizzle()
  private table = photos

  getAlbumPhotos = async (searchAlbumId: string, searchUserId: string) => {
    const {
      albumId,
      originalResizedUrl,
      originalUrl,
      watermarkResizedUrl,
      watermarkUrl,
      id,
      name,
    } = this.table

    const photos = await this.db
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

    return photos
  }
}
