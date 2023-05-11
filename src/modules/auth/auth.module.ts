import express from 'express'
import { ctrlWrapper } from 'helpers'
import { uploadFiles, validate, validateToken } from 'middleware'
import { AuthController } from './auth.controller'
import { singInDto, verifyDto } from './dto'

const router = express.Router()

const { breakpointName, singIn, verify, regenerateVerificationCode, addSelfie } =
  new AuthController()

router.post(`/${breakpointName}/singIn`, validate(singInDto, 'body'), ctrlWrapper(singIn))
router.post(`/${breakpointName}/verify`, validate(verifyDto, 'body'), ctrlWrapper(verify))
router.post(
  `/${breakpointName}/regenerate`,
  validate(singInDto, 'body'),
  ctrlWrapper(regenerateVerificationCode)
)
router.post(`/${breakpointName}/selfie`, validateToken, uploadFiles, ctrlWrapper(addSelfie))

export const authRouter = router
