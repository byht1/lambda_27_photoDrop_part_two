import {
  IAlbumsController,
  TBreakpointName,
  TGerAlbumsPhotosRoutFn,
  TGerUserAlbumsAndPhotosRoutFn,
  TGetPhotoByIdRoutFn,
} from './type'
import { AlbumsService } from './albums.service'
import { createError } from 'helpers'

export class AlbumsController implements IAlbumsController {
  public breakpointName: TBreakpointName = 'albums'
  private albumsService = new AlbumsService()

  getAlbumPhotos: TGerAlbumsPhotosRoutFn = async (req, res) => {
    const { albumId } = req.params
    const query = req.query
    const user = req.user
    if (!user) throw createError(500)
    const photos = await this.albumsService.getAlbumPhotos(albumId, user.id, query)

    return res.json(photos)
  }

  userAlbumsAndPhotos: TGerUserAlbumsAndPhotosRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw createError(500)
    const { id, name, avatar, phone } = user

    const albums = await this.albumsService.userAlbumsAndPhotos(id)
    const response = { ...albums, user: { id, name, avatar, phone } }

    return res.json(response)
  }

  getPhotoById: TGetPhotoByIdRoutFn = async (req, res) => {
    const { photoId } = req.params
    const user = req.user
    if (!user) throw createError(500)

    const photo = await this.albumsService.getPhotoById(photoId, user.id)
    return res.json(photo)
  }
}
