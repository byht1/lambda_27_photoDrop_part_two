import { TGetAlbumPhotosResponse, TGetAlbumsResponse } from 'db/repository'

// CONTROLLER _____________
export interface IAlbumsController {
  readonly breakpointName: TBreakpointName
  getAlbums: TGerAlbumsRoutFn
  getAlbumPhotos: TGerAlbumsPhotosRoutFn
  userAlbumsAndPhotos: TGerUserAlbumsAndPhotosRoutFn
}

export type TGerAlbumsRoutFn = TRouterFn<TGetAlbumsResponse, void, void, TPaginationQueryParams>
export type TGerAlbumsPhotosRoutFn = TRouterFn<
  TGetAlbumPhotosResponse,
  void,
  TGerAlbumsPhotos,
  TPaginationQueryParams
>
export type TGerUserAlbumsAndPhotosRoutFn = TRouterFn<any, void>

export type TBreakpointName = 'albums'
export type TPaginationQueryParams = { limit: number; page: number }
type TGerAlbumsPhotos = { albumId: string }

// SERVICE _____________
export interface IAlbumsService {
  getAlbums: TGetAlbumsFn
  getAlbumPhotos: TGerAlbumsPhotosFn
  userAlbumsAndPhotos: TGetUserAlbumsAndPhotosFn
}

export type TGetAlbumsFn = (query: TPaginationQueryParams) => Promise<TGetAlbumsResponse>
export type TGerAlbumsPhotosFn = (
  albumId: string,
  userId: string,
  query: TPaginationQueryParams
) => Promise<TGetAlbumPhotosResponse>
export type TGetUserAlbumsAndPhotosFn = (userId: string) => Promise<any>
