import Stripe from 'stripe'
import util from 'util'
import {
  IPaymentController,
  TBreakpointName,
  TCreatePaymentRoutFn,
  THookPaymentRoutFn,
} from './type'
import { createError, getEnv } from 'helpers'
import { PaymentService } from './payment.service'

const stripe = new Stripe(getEnv('PAYMENT_SECRET_KEY'), {
  apiVersion: '2022-11-15',
})

export class PaymentController implements IPaymentController {
  public breakpointName: TBreakpointName = 'payment'
  private paymentService = new PaymentService()

  createPayment: TCreatePaymentRoutFn = async (req, res) => {
    const purchaseDto = req.body
    const user = req.user
    if (!user) throw createError(500)

    const redirectUrl = await this.paymentService.createPayment(user.id, purchaseDto)

    return res.redirect(303, redirectUrl)
  }

  hookPayment: THookPaymentRoutFn = async (req) => {
    const payloadEventObj = req.body
    await this.paymentService.hookPayment(payloadEventObj)
    return
  }
}
