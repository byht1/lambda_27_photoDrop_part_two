import { TSingInDto, TVerifyDto } from './dto'

// CONTROLLER_________
export interface IAuthController {
  breakpointName: TBreakpointName
  singIn: TSingInRoutFn
  verify: TVerifyRoutFn
  regenerateVerificationCode: TRegenerateVerificationCodeRoutFn
  addSelfie: TRegenerateSelfieRoutFn
}

export type TSingInRoutFn = TRouterFn<string, TSingInDto>
export type TVerifyRoutFn = TRouterFn<TToken, TVerifyDto>
export type TRegenerateVerificationCodeRoutFn = TRouterFn<string, TSingInDto>
export type TRegenerateSelfieRoutFn = TRouterFn<string[], void>

export type TBreakpointName = 'auth'

//SERVICE___________
export interface IAuthService {
  singIn: TSingInFn
  verify: TVerifyFn
  regenerateVerificationCode: TRegenerateVerificationCodeFn
  // addSelfie: TRegenerateSelfieFn
}

export type TSingInFn = (phoneNumber: string) => Promise<string>
export type TVerifyFn = (bodyRequest: TVerifyDto) => Promise<TToken>
export type TRegenerateVerificationCodeFn = (phoneNumber: string) => Promise<string>
export type TRegenerateSelfieFn = (
  files: Express.Multer.File[],
  userId: string
) => Promise<string[]>

type TToken = { token: string }
