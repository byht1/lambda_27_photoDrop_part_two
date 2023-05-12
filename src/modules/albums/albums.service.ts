import { AlbumsRepository, PhotosRepository } from 'db/repository'
import { IAlbumsService, TGerAlbumsPhotosFn, TGetAlbumsFn, TGetUserAlbumsAndPhotosFn } from './type'
import { formatQueryParams } from 'helpers/formatPaginationParams'

export class AlbumsService implements IAlbumsService {
  private photosModel = new PhotosRepository()
  private albumsModel = new AlbumsRepository()

  getAlbums: TGetAlbumsFn = async (queryParams) => {
    const pagination = formatQueryParams(queryParams)
    const albums = await this.albumsModel.getAll(pagination)

    return albums
  }

  getAlbumPhotos: TGerAlbumsPhotosFn = async (albumId, userId, queryParams) => {
    const pagination = formatQueryParams(queryParams)
    const photos = await this.photosModel.getAlbumPhotos(albumId, userId, pagination)
    return photos
  }

  userAlbumsAndPhotos: TGetUserAlbumsAndPhotosFn = async (userId) => {
    const albums = await this.photosModel.userAlbumsAndPhotos(userId)
    return albums
  }
}
