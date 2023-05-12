import { TAlbums, TPhotos } from 'db/schema'
import { TPaginationParams, TPaginationResponse } from '../helpers'

export interface IPhotosRepository {
  getAlbumPhotos: TGetAlbumPhotosFn
  userAlbumsAndPhotos: TUserAlbumsAndPhotsFn
}

export type TGetAlbumPhotosFn = (
  albumId: string,
  userId: string,
  params: TPaginationParams
) => Promise<TGetAlbumPhotosResponse>
export type TUserAlbumsAndPhotsFn = (userId: string) => Promise<TUserAlbumsAndPhotsResponse>

export type TGetAlbumPhotosDBResponse = Pick<TPhotos, 'id' | 'name'> & TUrl
export type TGetAlbumPhotosResponse =
  | TPaginationResponse<'photos', TGetAlbumPhotosDBResponse> & {
      album: TAlbums | null
    }

export type TPhotosWithUser = Pick<TPhotos, 'id' | 'name' | 'albumId'> & TUrl
export type TUserAlbumsAndPhotsResponse = {
  photos: TPhotosWithUser[]
  albums: TAlbums[]
}

type TUrl = {
  smallPhotoURL: string
  largePhotoURL: string
}
