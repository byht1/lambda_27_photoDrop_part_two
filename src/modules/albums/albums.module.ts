import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validate } from 'middleware'
import { AlbumsController } from './albums.controller'
import { paginationDto } from 'modules/dto/pagination.dto'
import { validateToken } from 'middleware'

const router = express.Router()

const { breakpointName, getAlbums, getAlbumPhotos } = new AlbumsController()

router.get(`/${breakpointName}`, validate(paginationDto, 'query'), ctrlWrapper(getAlbums))
router.get(`/${breakpointName}/:albumId`, validateToken, ctrlWrapper(getAlbumPhotos))

export const albumsRouter = router
