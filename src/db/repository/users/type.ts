import { TNewUsers, TUsers } from 'db/schema/user.schema';

export interface IPhotosRepository {
  create: TCreateFn;
  getPhone: TGetPhoneFn;
  addVerification: TAddVerificationFn;
  updateToken: TUpdateTokenFn;
  //   getCode: any;
}

export type TCreateFn = (userData: TCreteUser) => Promise<TUsers>;
export type TGetPhoneFn = (phone: string) => Promise<TUsers | undefined>;
export type TAddVerificationFn = (
  userId: string,
  verificationData: TAddVerificationData
) => Promise<TUsers>;
export type TUpdateTokenFn = (userId: string, token: TUpdateTokenData) => Promise<TUsers>;

export type TUpdatePrivateFn = (
  userId: string,
  updateData: Partial<TUpdateData>
) => Promise<TUsers>;

// type TUserData = Required<TNewUsers>;
export type TCreteUser = Pick<TUsers, 'verificationToken' | 'phone'>;
export type TAddVerificationData = Pick<TUsers, 'verificationToken' | 'token'>;
export type TUpdateTokenData = Pick<TUsers, 'token'> & Partial<TAddVerificationData>;
export type TUpdateData = Omit<TUsers, 'id'>;
