import express from 'express'
import { ctrlWrapper } from 'helpers'
import { validate, validateToken } from 'middleware'
import { PaymentController } from './payment.controller'
import { purchaseDto } from './dto/purchase.dto'

const router = express.Router()

const { breakpointName, createPayment, hookPayment } = new PaymentController()

router.post(
  `/${breakpointName}`,
  validateToken,
  validate(purchaseDto, 'body'),
  ctrlWrapper(createPayment)
)
router.post(`/${breakpointName}/hook`, ctrlWrapper(hookPayment))

export const paymentRouter = router
