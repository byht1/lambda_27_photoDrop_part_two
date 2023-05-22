import express from 'express'
import { ctrlWrapper } from 'helpers'
import { AlbumsController } from './albums.controller'
import { validateToken } from 'middleware'

const router = express.Router()

const { breakpointName, getAlbumPhotos, userAlbumsAndPhotos, getPhotoById } = new AlbumsController()

router.get(`/${breakpointName}/:albumId`, validateToken, ctrlWrapper(getAlbumPhotos))
router.get(`/${breakpointName}`, validateToken, ctrlWrapper(userAlbumsAndPhotos))
router.get(`/${breakpointName}/photos/:photoId`, validateToken, ctrlWrapper(getPhotoById))

export const albumsRouter = router
