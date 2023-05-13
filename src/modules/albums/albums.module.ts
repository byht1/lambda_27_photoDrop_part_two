import express from 'express'
import { ctrlWrapper } from 'helpers'
import { AlbumsController } from './albums.controller'
import { paginationDto } from 'modules/dto/pagination.dto'
import { validateToken, validate } from 'middleware'

const router = express.Router()

const { breakpointName, getAlbums, getAlbumPhotos, userAlbumsAndPhotos } = new AlbumsController()

router.get(
  `/${breakpointName}`,
  validateToken,
  validate(paginationDto, 'query'),
  ctrlWrapper(getAlbums)
)
router.get(`/${breakpointName}/:albumId`, validateToken, ctrlWrapper(getAlbumPhotos))
router.get(`/${breakpointName}/user/mark`, validateToken, ctrlWrapper(userAlbumsAndPhotos))

export const albumsRouter = router
