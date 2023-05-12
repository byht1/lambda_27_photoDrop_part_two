import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validate } from 'middleware'
import { AlbumsController } from './albums.controller'
import { paginationDto } from 'modules/dto/pagination.dto'
import { validateToken } from 'middleware'

const router = express.Router()

const { breakpointName, getAlbums, getAlbumPhotos, userAlbumsAndPhotos } = new AlbumsController()

router.get(`/${breakpointName}`, validate(paginationDto, 'query'), ctrlWrapper(getAlbums))
router.get(`/${breakpointName}/:albumId`, validateToken, ctrlWrapper(getAlbumPhotos))
router.get(`/${breakpointName}/user/mark`, validateToken, ctrlWrapper(userAlbumsAndPhotos))

export const albumsRouter = router
