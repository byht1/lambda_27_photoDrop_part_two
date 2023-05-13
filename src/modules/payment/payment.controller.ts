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

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: 'Album',
    //           description: `Album: ID ID ID`,
    //           images: [
    //             'https://photo-drop-ambda.s3.eu-central-1.amazonaws.com/290b3489-e22c-4f06-be85-07ca9d5d62dc/watermark/resized/aa490b4e-99ba-4484-a066-55a22ff4630e.png',
    //           ],
    //         },
    //         unit_amount: 2000,
    //       },
    //       quantity: 2,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: 'http://localhost:5000',
    //   cancel_url: 'http://localhost:4242/cancel',
    //   payment_intent_data: {
    //     description: JSON.stringify({
    //       userId: '11111111111',
    //       albumId: '2222222222',
    //     }),
    //   },
    // })

    const redirectUrl = await this.paymentService.createPayment(user.id, purchaseDto)
    console.log('🚀  PaymentController  redirectUrl:', redirectUrl)

    return res.redirect(303, redirectUrl)
  }

  hookPayment: THookPaymentRoutFn = async (req) => {
    const payloadEventObj = req.body
    console.log('🚀  PaymentController  payloadEventObj:', payloadEventObj)
    await this.paymentService.hookPayment(payloadEventObj)
    return
  }
}
