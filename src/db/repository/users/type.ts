import { TNewUserPurchases, TUsers } from 'db/schema'

export interface IPhotosRepository {
  create: TCreateFn
  getById: TGetByIdFn
  getPhone: TGetPhoneFn
  addVerification: TAddVerificationFn
  updateToken: TUpdateTokenFn
  addPurchasedPhoto: TAddPurchasedPhotoFn
  setUserData: TSetUserDataFn
}

export type TCreateFn = (userData: TCreteUser) => Promise<TUsers>
export type TGetByIdFn = (userId: string) => Promise<TUsers | undefined>
export type TGetPhoneFn = (phone: string) => Promise<TUsers | undefined>
export type TAddVerificationFn = (
  userId: string,
  verificationData: TAddVerificationData
) => Promise<TUsers>
export type TUpdateTokenFn = (userId: string, token: TUpdateTokenData) => Promise<TUsers>
export type TAddPurchasedPhotoFn = (data: TNewUserPurchases[]) => Promise<void>
export type TSetUserDataFn = (userId: string, updateData: Partial<TUpdateData>) => Promise<TUsers>
export type TUpdatePrivateFn = (userId: string, updateData: Partial<TUpdateData>) => Promise<TUsers>

export type TCreteUser = Pick<TUsers, 'verificationToken' | 'phone'>
export type TAddVerificationData = Pick<TUsers, 'verificationToken' | 'token'>
export type TUpdateTokenData = Pick<TUsers, 'token'> & Partial<TAddVerificationData>
export type TUpdateData = Omit<TUsers, 'id'>
