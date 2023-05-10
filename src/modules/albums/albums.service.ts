import { PhotosRepository } from 'db/repository'
import { IAlbumsService, TGerAlbumsPhotosFn } from './type'

export class AlbumsService implements IAlbumsService {
  private photosModel = new PhotosRepository()

  getAlbumPhotos: TGerAlbumsPhotosFn = async (albumId, userId) => {
    const photos = await this.photosModel.getAlbumPhotos(albumId, userId)
    return photos
  }
}
