import express from 'express'
import { ctrlWrapper } from 'helpers'
import { uploadFiles, validateToken } from 'middleware'
import { UserController } from './user.controller'

const router = express.Router()

const { breakpointName, addSelfie, setAvatar } = new UserController()

router.post(`/${breakpointName}/selfie`, validateToken, uploadFiles, ctrlWrapper(addSelfie))
router.patch(`/${breakpointName}/avatar`, validateToken, ctrlWrapper(setAvatar))

export const userRouter = router
