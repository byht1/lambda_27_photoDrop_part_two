import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validateToken, validate } from 'middleware'
import { UserController } from './user.controller'
import { setUserDto } from './dto'

const router = express.Router()

const { breakpointName, addSelfie, setUserData } = new UserController()

router.patch(
  `/${breakpointName}`,
  validateToken,
  validate(setUserDto, 'body'),
  ctrlWrapper(setUserData)
)
router.post(`/${breakpointName}/selfie`, validateToken, ctrlWrapper(addSelfie))

export const userRouter = router
