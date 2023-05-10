import { IAlbumsController, TGerAlbumsPhotosRoutFn } from './type'
import { AlbumsService } from './albums.service'

export class AlbumsController implements IAlbumsController {
  private albumsService = new AlbumsService()

  getAlbumPhotos: TGerAlbumsPhotosRoutFn = async (req, res) => {
    const { albumId } = req.params
    const photos = await this.albumsService.getAlbumPhotos(
      albumId,
      'c5ec2800-4dc9-45df-9b1c-1639baca8041'
    )

    return res.json(photos)
  }
}
