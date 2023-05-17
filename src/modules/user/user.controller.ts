import { IUserController, TBreakpointName, TAddSelfieRoutFn, TSetUserDataRoutFn } from './type'
import { UserService } from './user.service'

export class UserController implements IUserController {
  public breakpointName: TBreakpointName = 'user'
  private userService = new UserService()

  addSelfie: TAddSelfieRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw new Error()
    const { photos } = req.body

    const URLs = await this.userService.addSelfie(photos, user.id)
    return res.json(URLs)
  }

  setUserData: TSetUserDataRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw new Error()
    const setUserDto = req.body

    const newUserData = await this.userService.setUserData(user.id, setUserDto)
    return res.json(newUserData)
  }
}
