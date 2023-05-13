import { PaymentEventObj } from 'modules/lib'
import { TPurchaseDto } from './dto/purchase.dto'

// CONTROLLER ____________
export interface IPaymentController {
  readonly breakpointName: TBreakpointName
  createPayment: TCreatePaymentRoutFn
  hookPayment: THookPaymentRoutFn
}

export type TCreatePaymentRoutFn = (
  req: Req<void, TPurchaseDto>,
  res: Res<void>,
  next?: Next
) => Promise<any>
export type THookPaymentRoutFn = (
  req: Req<void, PaymentEventObj>,
  res: Res<void>,
  next?: Next
) => Promise<any>

export type TBreakpointName = 'payment'

// SERVICES ______________
export interface IPaymentService {
  createPayment: TCreatePaymentFn
  hookPayment: THookPaymentFn
}

export type TCreatePaymentFn = (userId: string, purchaseDto: TPurchaseDto) => Promise<string>
export type THookPaymentFn = (eventObj: PaymentEventObj) => Promise<void>
