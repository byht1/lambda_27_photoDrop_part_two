import { TPhotos } from 'db/schema'

export interface IPhotosRepository {
  getAlbumPhotos: any
}

export type TGetAlbumPhotosFn = (
  albumId: string,
  isOwner: boolean
) => Promise<TGetAlbumPhotosResponse[]>

type TGetAlbumPhotosResponse = Pick<TPhotos, 'id' | 'name'> & TUrl

type TUrl = {
  smallPhotoURL: string
  largePhotoURL: string
}
