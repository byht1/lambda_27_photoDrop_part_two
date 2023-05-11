import { TGetAlbumPhotosResponse, TGetAlbumsResponse } from 'db/repository'

// CONTROLLER _____________
export interface IAlbumsController {
  breakpointName: TBreakpointName
  getAlbums: TGerAlbumsRoutFn
  getAlbumPhotos: TGerAlbumsPhotosRoutFn
}

export type TGerAlbumsRoutFn = TRouterFn<TGetAlbumsResponse, void, void, TPaginationQueryParams>
export type TGerAlbumsPhotosRoutFn = TRouterFn<
  TGetAlbumPhotosResponse,
  void,
  TGerAlbumsPhotos,
  TPaginationQueryParams
>

export type TBreakpointName = 'albums'
export type TPaginationQueryParams = { limit: number; page: number }
type TGerAlbumsPhotos = { albumId: string }

// SERVICE _____________
export interface IAlbumsService {
  getAlbums: TGetAlbumsFn
  getAlbumPhotos: TGerAlbumsPhotosFn
}

export type TGetAlbumsFn = (query: TPaginationQueryParams) => Promise<TGetAlbumsResponse>
export type TGerAlbumsPhotosFn = (
  albumId: string,
  userId: string,
  query: TPaginationQueryParams
) => Promise<TGetAlbumPhotosResponse>
