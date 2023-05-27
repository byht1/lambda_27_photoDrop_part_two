import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validate, validateToken } from 'middleware'
import { AuthController } from './auth.controller'
import { singInDto, verifyDto } from './dto'

const router = express.Router()

const { breakpointName, singIn, verify, regenerateVerificationCode, current } = new AuthController()

router.post(`/${breakpointName}/singIn`, validate(singInDto, 'body'), ctrlWrapper(singIn))
router.post(`/${breakpointName}/verify`, validate(verifyDto, 'body'), ctrlWrapper(verify))
router.post(
  `/${breakpointName}/regenerate`,
  validate(singInDto, 'body'),
  ctrlWrapper(regenerateVerificationCode)
)
router.post(`/${breakpointName}/current`, validateToken, ctrlWrapper(current))

export const authRouter = router
