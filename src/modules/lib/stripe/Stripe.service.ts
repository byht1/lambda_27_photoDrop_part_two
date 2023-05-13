import Stripe from 'stripe'
import { IStripeService, TNewPurchaseFn, TPurchasePayload, TWebhookFn } from './type/type'
import { getEnv } from 'helpers'

export class StripeService implements IStripeService {
  private stripe = new Stripe(getEnv('PAYMENT_SECRET_KEY'), {
    apiVersion: '2022-11-15',
  })

  newPurchase: TNewPurchaseFn = async (options) => {
    const { name, price, quantity, cancelUrl, successUrl, payload, images = [] } = options

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Payment',
              description: `Album: ${name}`,
              images,
            },
            unit_amount: price * 100,
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_intent_data: {
        description: JSON.stringify(payload),
      },
    })

    return session.url || getEnv('CLIENT_URL_SERVER_ERROR')
  }

  webhook: TWebhookFn = (eventObj) => {
    const { data } = eventObj
    const { status, description } = data.object

    return {
      isSuccess: status === 'succeeded',
      payload: JSON.parse(description) as TPurchasePayload,
    }
  }
}
