import { TPaginationParams, TPaginationResponse } from '../helpers'

export interface IPhotosRepository {
  getAlbumPhotos: TGetAlbumPhotosFn
  userAlbumsAndPhotos: TUserAlbumsAndPhotsFn
  getAllForAlbums: TGetAllForAlbumsFn
  getById: TGetByIdFn
}

export type TGetAlbumPhotosFn = (
  albumId: string,
  userId: string,
  params: TPaginationParams
) => Promise<TGetAlbumPhotosResponse>
export type TUserAlbumsAndPhotsFn = (
  userPhone: string,
  userId: string
) => Promise<TUserAlbumsAndPhotsResponse>
export type TGetAllForAlbumsFn = (albumId: string) => Promise<TGetAllForAlbumsResponse[]>
export type TGetByIdFn = (
  photoId: string,
  userId: string
) => Promise<TGetAlbumPhotosDBResponse | undefined>

export type TGetAlbumPhotosDBResponse = TUrl & {
  albumID: string | null
  photoID: string
  name: string
}
export type TGetAlbumPhotosResponse =
  | TPaginationResponse<'photos', TGetAlbumPhotosDBResponse> & {
      album: {
        albumID: string
        owner: string
        name: string
        location: string
        createdAt: string
      } | null
    }
export type TGetAllForAlbumsResponse = { photoId: string }

export type TPhotosWithUser = {
  photoID: string
  albumID: string
  name: string
} & TUrl
export type TAlbumsWithUser = {
  albumID: string
  name: string
  url: string
}
export type TUserAlbumsAndPhotsResponse = {
  allPhotos: TPhotosWithUser[]
  albums: TAlbumsWithUser[]
}

type TUrl = {
  url: string
  largePhotoURL: string
}
