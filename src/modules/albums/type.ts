import { TGetAlbumPhotosResponse, TUserAlbumsAndPhotsResponse } from 'db/repository'
import { TUsers } from 'db/schema'

// CONTROLLER _____________
export interface IAlbumsController {
  readonly breakpointName: TBreakpointName
  getAlbumPhotos: TGerAlbumsPhotosRoutFn
  userAlbumsAndPhotos: TGerUserAlbumsAndPhotosRoutFn
}

export type TGerAlbumsPhotosRoutFn = TRouterFn<
  TGetAlbumPhotosResponse,
  void,
  TGerAlbumsPhotos,
  TPaginationQueryParams
>
export type TGerUserAlbumsAndPhotosRoutFn = TRouterFn<TGerAlbumsPhotosResponse, void>

export type TBreakpointName = 'albums'
export type TPaginationQueryParams = { limit: number; page: number }
export type TGerAlbumsPhotosResponse = TUserAlbumsAndPhotsResponse & {
  user: Omit<TUsers, 'token' | 'verificationToken'>
}
type TGerAlbumsPhotos = { albumId: string }

// SERVICE _____________
export interface IAlbumsService {
  getAlbumPhotos: TGerAlbumsPhotosFn
  userAlbumsAndPhotos: TGetUserAlbumsAndPhotosFn
}

export type TGerAlbumsPhotosFn = (
  albumId: string,
  userId: string,
  query: TPaginationQueryParams
) => Promise<TGetAlbumPhotosResponse>
export type TGetUserAlbumsAndPhotosFn = (userId: string) => Promise<TUserAlbumsAndPhotsResponse>
