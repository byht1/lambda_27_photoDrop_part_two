import { TSingInDto, TVerifyDto } from './dto';

// CONTROLLER_________
export interface IAuthController {
  singIn: TSingInRoutFn;
  verify: TVerifyRoutFn;
  regenerateVerificationCode: TRegenerateVerificationCodeRoutFn;
}

export type TSingInRoutFn = TRouterFn<string, TSingInDto>;
export type TVerifyRoutFn = TRouterFn<TToken, TVerifyDto>;
export type TRegenerateVerificationCodeRoutFn = TRouterFn<string, TSingInDto>;

//SERVICE___________
export interface IAuthService {
  singIn: TSingInFn;
  verify: TVerifyFn;
  regenerateVerificationCode: TRegenerateVerificationCodeFn;
}

export type TSingInFn = (phoneNumber: string) => Promise<string>;
export type TVerifyFn = (bodyRequest: TVerifyDto) => Promise<TToken>;
export type TRegenerateVerificationCodeFn = (phoneNumber: string) => Promise<string>;

type TToken = { token: string };
