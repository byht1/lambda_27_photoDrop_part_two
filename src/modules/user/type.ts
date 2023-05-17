import { TUsers } from 'db/schema'
import { TAddPhotosDto, TSetUserDto } from './dto'

// CONTROLLER __________________
export interface IUserController {
  readonly breakpointName: TBreakpointName
  addSelfie: TAddSelfieRoutFn
  setUserData: TSetUserDataRoutFn
  // setAvatar: TSetAvatarRoutFn
  // setName: TSetNameRoutFn
}

export type TAddSelfieRoutFn = TRouterFn<string[], TAddPhotosDto>
export type TSetUserDataRoutFn = TRouterFn<TUserNewDataResponse, TSetUserDto>

export type TBreakpointName = 'user'

// SERVICE __________________
export interface IUserService {
  addSelfie: TAddSelfieFn
  setUserData: TSetUserDataFn
  // setAvatar: TSetAvatarFn
  // setName: TSetNameFn
}

export type TAddSelfieFn = (files: string[], userId: string) => Promise<string[]>
export type TSetUserDataFn = (userId: string, userDto: TSetUserDto) => Promise<TUserNewDataResponse>

type TUserNewDataResponse = Omit<TUsers, 'token' | 'verificationToken'>
