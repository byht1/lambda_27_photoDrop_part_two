import { TUsers } from 'db/schema'
import { TAddPhotosDto, TSetUserDto } from './dto'
import { S3 } from 'aws-sdk'
import { TUpdateData } from 'db/repository/users/type'

// CONTROLLER __________________
export interface IUserController {
  readonly breakpointName: TBreakpointName
  addSelfie: TAddSelfieRoutFn
  setUserData: TSetUserDataRoutFn
  // setAvatar: TSetAvatarRoutFn
  // setName: TSetNameRoutFn
}

export type TAddSelfieRoutFn = TRouterFn<S3.PresignedPost[], TAddPhotosDto>
export type TSetUserDataRoutFn = TRouterFn<TUserNewDataResponse, TSetUserDto>

export type TBreakpointName = 'user'

// SERVICE __________________
export interface IUserService {
  addSelfie: TAddSelfieFn
  setUserData: TSetUserDataFn
  // setAvatar: TSetAvatarFn
  // setName: TSetNameFn
}

export type TAddSelfieFn = (files: string[], userId: string) => Promise<S3.PresignedPost[]>
export type TSetUserDataFn = (userId: string, userDto: TSetUserDto) => Promise<TUserNewDataResponse>
export type TNewUserPhoneFn = (userDto: TSetUserDto) => Promise<Partial<TUpdateData>>

type TUserNewDataResponse = Omit<TUsers, 'token' | 'verificationToken'>
