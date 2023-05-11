import {
  IAlbumsController,
  TBreakpointName,
  TGerAlbumsPhotosRoutFn,
  TGerAlbumsRoutFn,
} from './type'
import { AlbumsService } from './albums.service'
import { createError } from 'helpers'

export class AlbumsController implements IAlbumsController {
  public breakpointName: TBreakpointName = 'albums'
  private albumsService = new AlbumsService()

  getAlbums: TGerAlbumsRoutFn = async (req, res) => {
    const query = req.query
    const albums = await this.albumsService.getAlbums(query)
    return res.json(albums)
  }

  getAlbumPhotos: TGerAlbumsPhotosRoutFn = async (req, res) => {
    const { albumId } = req.params
    const query = req.query
    const user = req.user
    if (!user) throw createError(500)
    const photos = await this.albumsService.getAlbumPhotos(albumId, user.id, query)

    return res.json(photos)
  }
}
