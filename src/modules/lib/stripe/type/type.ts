import { PaymentEventObj } from './payment'

export interface IStripeService {
  newPurchase: TNewPurchaseFn
  webhook: TWebhookFn
}

export type TNewPurchaseFn = (options: TNewPurchaseOptions) => Promise<string>
export type TWebhookFn = (eventObj: PaymentEventObj) => TWebhookResponse

export type TNewPurchaseOptions = {
  name: string
  price: number
  quantity: number
  successUrl: string
  cancelUrl: string
  payload: TPurchasePayload
  images?: string[]
}
export type TPurchasePayload = {
  userId: string
  albumId: string
}
type TWebhookResponse = {
  isSuccess: boolean
  payload: TPurchasePayload
}
