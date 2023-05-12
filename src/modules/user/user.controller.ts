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

    try {
      const files = req.files as Express.Multer.File[]
      const URLs = await this.userService.addSelfie(files, user.id)
      return res.json(URLs)
    } catch (error) {
      await this.userService.clearDirectory(user.id)
      throw error
    }
  }

  setAvatar: TRegenerateAvatarRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw new Error()
    const setAvatarDto = req.body

    const userUpdateData = await this.userService.setAvatar(user.id, setAvatarDto)
    return res.json(userUpdateData)
  }
}
