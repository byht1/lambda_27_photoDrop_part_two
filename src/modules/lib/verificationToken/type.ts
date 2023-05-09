export interface IVerificationTokenService {
  createToken: TCreateTokenFn;
  verify: TVerifyFn;
  decode: TDecodeFn;
}

export type TCreateTokenFn = (attemptNumber: number) => { token: string; code: number };
export type TVerifyFn = (
  token: string,
  errorFn?: () => Promise<void>
) => Promise<TPayloadVerificationToken>;
export type TDecodeFn = (token: string) => TPayloadVerificationToken | null;

export type TPayloadVerificationToken = { code: number; attemptNumber: number };
