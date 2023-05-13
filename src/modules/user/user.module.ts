import express from 'express'
import { ctrlWrapper } from 'helpers'
import { uploadFiles, validateToken, validate } from 'middleware'
import { UserController } from './user.controller'
import { setAvatarDto } from './dto/setAvatar.dto'

const router = express.Router()

const { breakpointName, addSelfie, setAvatar } = new UserController()

router.post(`/${breakpointName}/selfie`, validateToken, uploadFiles, ctrlWrapper(addSelfie))
router.patch(
  `/${breakpointName}/avatar`,
  validateToken,
  validate(setAvatarDto, 'body'),
  ctrlWrapper(setAvatar)
)

export const userRouter = router
