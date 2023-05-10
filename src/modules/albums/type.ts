// CONTROLLER _____________
export interface IAlbumsController {
  getAlbumPhotos: TGerAlbumsPhotosRoutFn
}

export type TGerAlbumsPhotosRoutFn = TRouterFn<any, void, { albumId: string }>

// SERVICE _____________
export interface IAlbumsService {
  getAlbumPhotos: TGerAlbumsPhotosFn
}

export type TGerAlbumsPhotosFn = (albumId: string, userId: string) => Promise<any>
