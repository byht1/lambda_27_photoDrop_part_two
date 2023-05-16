import { TSetAvatarDto } from './dto/setAvatar.dto'
import { TAddPhotosDto } from './dto/addSelfie.dto'

// CONTROLLER __________________
export interface IUserController {
  readonly breakpointName: TBreakpointName
  addSelfie: TRegenerateSelfieRoutFn
  setAvatar: TRegenerateAvatarRoutFn
}

export type TRegenerateSelfieRoutFn = TRouterFn<string[], TAddPhotosDto>
export type TRegenerateAvatarRoutFn = TRouterFn<TSetAvatarResponse, TSetAvatarDto>

export type TBreakpointName = 'user'

// SERVICE __________________
export interface IUserService {
  addSelfie: TRegenerateSelfieFn
  setAvatar: TRegenerateAvatarFn
}

export type TRegenerateSelfieFn = (files: string[], userId: string) => Promise<string[]>
export type TRegenerateAvatarFn = (
  userId: string,
  avatarDto: TSetAvatarDto
) => Promise<TSetAvatarResponse>

type TSetAvatarResponse = { avatar: string }
