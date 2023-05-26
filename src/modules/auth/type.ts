import { TUsers } from 'db/schema'
import { TSingInDto, TVerifyDto } from './dto'

// CONTROLLER_________
export interface IAuthController {
  readonly breakpointName: TBreakpointName
  singIn: TSingInRoutFn
  verify: TVerifyRoutFn
  regenerateVerificationCode: TRegenerateVerificationCodeRoutFn
}

export type TSingInRoutFn = TRouterFn<string, TSingInDto>
export type TVerifyRoutFn = TRouterFn<TUserResponse, TVerifyDto>
export type TRegenerateVerificationCodeRoutFn = TRouterFn<string, TSingInDto>

export type TBreakpointName = 'auth'

//SERVICE___________
export interface IAuthService {
  singIn: TSingInFn
  verify: TVerifyFn
  regenerateVerificationCode: TRegenerateVerificationCodeFn
}

export type TSingInFn = (phoneNumber: string) => Promise<string>
export type TVerifyFn = (bodyRequest: TVerifyDto) => Promise<TUserResponse>
export type TRegenerateVerificationCodeFn = (phoneNumber: string) => Promise<string>

type TUserResponse = Pick<TUsers, 'id' | 'avatar' | 'token' | 'phone' | 'name' | 'email'>
