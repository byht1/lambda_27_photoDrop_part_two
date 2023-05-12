import { TNewUsersSelfie, TUsers } from 'db/schema'

export interface IPhotosRepository {
  create: TCreateFn
  getById: TGetByIdFn
  getPhone: TGetPhoneFn
  addVerification: TAddVerificationFn
  updateToken: TUpdateTokenFn
  addSelfie: TAddSelfieFn
  setAvatar: TSetAvatarFn
}

export type TCreateFn = (userData: TCreteUser) => Promise<TUsers>
export type TGetByIdFn = (userId: string) => Promise<TUsers | undefined>
export type TGetPhoneFn = (phone: string) => Promise<TUsers | undefined>
export type TAddVerificationFn = (
  userId: string,
  verificationData: TAddVerificationData
) => Promise<TUsers>
export type TUpdateTokenFn = (userId: string, token: TUpdateTokenData) => Promise<TUsers>
export type TAddSelfieFn = (data: TNewUsersSelfie[]) => Promise<string[]>
export type TSetAvatarFn = (userId: string, avatarUpdate: TSetAvatarData) => Promise<TUsers>

export type TUpdatePrivateFn = (userId: string, updateData: Partial<TUpdateData>) => Promise<TUsers>

export type TCreteUser = Pick<TUsers, 'verificationToken' | 'phone'>
export type TAddVerificationData = Pick<TUsers, 'verificationToken' | 'token'>
export type TUpdateTokenData = Pick<TUsers, 'token'> & Partial<TAddVerificationData>
export type TSetAvatarData = { avatar: string }
export type TUpdateData = Omit<TUsers, 'id'>
