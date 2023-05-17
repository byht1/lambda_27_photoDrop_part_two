import express from 'express'
import { ctrlWrapper } from 'helpers'
import { AlbumsController } from './albums.controller'
import { validateToken } from 'middleware'

const router = express.Router()

const { breakpointName,  getAlbumPhotos, userAlbumsAndPhotos } = new AlbumsController()

router.get(`/${breakpointName}/:albumId`, validateToken, ctrlWrapper(getAlbumPhotos))
router.get(`/${breakpointName}`, validateToken, ctrlWrapper(userAlbumsAndPhotos))

export const albumsRouter = router
