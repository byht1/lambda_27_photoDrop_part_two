import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validate } from 'middleware'
import { AlbumsController } from './albums.controller'

const router = express.Router()
const breakpointName = 'albums'

const { getAlbumPhotos } = new AlbumsController()

router.get(`/${breakpointName}/:albumId`, ctrlWrapper(getAlbumPhotos))
// router.post(`/${breakpointName}/verify`, validate(verifyDto, 'body'), ctrlWrapper(verify))
// router.post(
//   `/${breakpointName}/regenerate`,
//   validate(singInDto, 'body'),
//   ctrlWrapper(regenerateVerificationCode)
// )

export const albumsRouter = router
