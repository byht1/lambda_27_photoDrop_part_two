import { AlbumsRepository, PhotosRepository } from 'db/repository'
import {
  IAlbumsService,
  TGerAlbumsPhotosFn,
  TGetPhotoByIdFn,
  TGetUserAlbumsAndPhotosFn,
} from './type'
import { formatQueryParams } from 'helpers/formatPaginationParams'
import { createError } from 'helpers'

export class AlbumsService implements IAlbumsService {
  private photosModel = new PhotosRepository()
  private albumsModel = new AlbumsRepository()

  getAlbumPhotos: TGerAlbumsPhotosFn = async (albumId, userId, queryParams) => {
    const pagination = formatQueryParams(queryParams)
    const photos = await this.photosModel.getAlbumPhotos(albumId, userId, pagination)
    return photos
  }

  userAlbumsAndPhotos: TGetUserAlbumsAndPhotosFn = async (...args) => {
    const albums = await this.photosModel.userAlbumsAndPhotos(...args)
    return albums
  }

  getPhotoById: TGetPhotoByIdFn = async (photoId, userId) => {
    const photo = await this.photosModel.getById(photoId, userId)
    if (!photo) throw createError(404, 'Photo not found')

    return photo
  }
}
