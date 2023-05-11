import { TPhotos } from 'db/schema'
import { TPaginationParams, TPaginationResponse } from '../helpers'

export interface IPhotosRepository {
  getAlbumPhotos: TGetAlbumPhotosFn
}

export type TGetAlbumPhotosFn = (
  albumId: string,
  userId: string,
  params: TPaginationParams
) => Promise<TGetAlbumPhotosResponse>

type TGetAlbumPhotosDBResponse = Pick<TPhotos, 'id' | 'name'> & TUrl
export type TGetAlbumPhotosResponse = TPaginationResponse<'photos', TGetAlbumPhotosDBResponse>

type TUrl = {
  smallPhotoURL: string
  largePhotoURL: string
}
