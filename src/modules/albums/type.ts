import { TGetAlbumPhotosResponse, TUserAlbumsAndPhotsResponse } from 'db/repository'
import { TGetAlbumPhotosDBResponse } from 'db/repository/photos/type'
import { TUsers } from 'db/schema'

// CONTROLLER _____________
export interface IAlbumsController {
  readonly breakpointName: TBreakpointName
  getAlbumPhotos: TGerAlbumsPhotosRoutFn
  userAlbumsAndPhotos: TGerUserAlbumsAndPhotosRoutFn
  getPhotoById: TGetPhotoByIdRoutFn
}

export type TGerAlbumsPhotosRoutFn = TRouterFn<
  TGetAlbumPhotosResponse,
  void,
  TGerAlbumsPhotos,
  TPaginationQueryParams
>
export type TGerUserAlbumsAndPhotosRoutFn = TRouterFn<TGerAlbumsPhotosResponse, void>
export type TGetPhotoByIdRoutFn = TRouterFn<TGetAlbumPhotosDBResponse, void, TGerPhotoById>

export type TBreakpointName = 'albums'
export type TPaginationQueryParams = { limit: number; page: number }
export type TGerAlbumsPhotosResponse = TUserAlbumsAndPhotsResponse & {
  user: Omit<TUsers, 'token' | 'verificationToken'>
}
type TGerAlbumsPhotos = { albumId: string }
type TGerPhotoById = { photoId: string }

// SERVICE _____________
export interface IAlbumsService {
  getAlbumPhotos: TGerAlbumsPhotosFn
  userAlbumsAndPhotos: TGetUserAlbumsAndPhotosFn
  getPhotoById: TGetPhotoByIdFn
}

export type TGerAlbumsPhotosFn = (
  albumId: string,
  userId: string,
  query: TPaginationQueryParams
) => Promise<TGetAlbumPhotosResponse>
export type TGetUserAlbumsAndPhotosFn = (
  userPhone: string,
  userId: string
) => Promise<TUserAlbumsAndPhotsResponse>
export type TGetPhotoByIdFn = (
  photoId: string,
  userId: string
) => Promise<TGetAlbumPhotosDBResponse>
