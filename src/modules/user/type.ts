import { TUsers } from 'db/schema'
import { TSetAvatarDto } from './dto/setAvatar.dto'

// CONTROLLER __________________
export interface IUserController {
  readonly breakpointName: TBreakpointName
  addSelfie: TRegenerateSelfieRoutFn
  setAvatar: TRegenerateAvatarRoutFn
}

export type TRegenerateSelfieRoutFn = TRouterFn<string[], void>
export type TRegenerateAvatarRoutFn = TRouterFn<TSetAvatarResponse, TSetAvatarDto>

export type TBreakpointName = 'user'

// SERVICE __________________
export interface IUserService {
  addSelfie: TRegenerateSelfieFn
  setAvatar: TRegenerateAvatarFn
  clearDirectory: (dir: string) => Promise<void>
}

export type TRegenerateSelfieFn = (
  files: Express.Multer.File[],
  userId: string
) => Promise<string[]>
export type TRegenerateAvatarFn = (
  userId: string,
  avatarDto: TSetAvatarDto
) => Promise<TSetAvatarResponse>

type TSetAvatarResponse = { avatar: string }
