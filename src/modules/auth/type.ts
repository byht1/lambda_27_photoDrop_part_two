import { TSingInDto, TVerifyDto } from './dto';

// CONTROLLER_________
export interface IAuthController {
  singIn: TSingInRoutFn;
  verify: TVerifyRoutFn;
}

export type TSingInRoutFn = TRouterFn<string, TSingInDto>;
export type TVerifyRoutFn = TRouterFn<TToken, TVerifyDto>;

//SERVICE___________
export interface IAuthService {
  singIn: TSingInFn;
  verify: TVerifyFn;
}

export type TSingInFn = (phoneNumber: string) => Promise<number>;
export type TVerifyFn = (bodyRequest: TVerifyDto) => Promise<TToken>;

type TToken = { token: string };
