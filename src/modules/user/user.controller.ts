import {
  IUserController,
  TBreakpointName,
  TRegenerateAvatarRoutFn,
  TRegenerateSelfieRoutFn,
} from './type'
import { UserService } from './user.service'

export class UserController implements IUserController {
  public breakpointName: TBreakpointName = 'user'
  private userService = new UserService()

  addSelfie: TRegenerateSelfieRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw new Error()
    const { photos } = req.body

    const URLs = await this.userService.addSelfie(photos, user.id)
    return res.json(URLs)
  }

  setAvatar: TRegenerateAvatarRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw new Error()
    const setAvatarDto = req.body

    const userUpdateData = await this.userService.setAvatar(user.id, setAvatarDto)
    return res.json(userUpdateData)
  }
}
