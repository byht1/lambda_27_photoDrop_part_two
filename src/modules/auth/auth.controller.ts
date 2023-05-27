import { createError } from 'helpers'
import { AuthService } from './auth.service'
import {
  IAuthController,
  TBreakpointName,
  TCurrentRoutFn,
  TRegenerateVerificationCodeRoutFn,
  TSingInRoutFn,
  TVerifyRoutFn,
} from './type'

export class AuthController implements IAuthController {
  public breakpointName: TBreakpointName = 'auth'
  private authService = new AuthService()

  singIn: TSingInRoutFn = async (req, res) => {
    const { phoneNumber } = req.body

    const code = await this.authService.singIn(phoneNumber)

    return res.send(code)
  }

  verify: TVerifyRoutFn = async (req, res) => {
    const verifyDto = req.body

    const user = await this.authService.verify(verifyDto)

    return res.json(user)
  }

  regenerateVerificationCode: TRegenerateVerificationCodeRoutFn = async (req, res) => {
    const { phoneNumber } = req.body

    const code = await this.authService.regenerateVerificationCode(phoneNumber)

    return res.send(code)
  }

  current: TCurrentRoutFn = async (req, res) => {
    const user = req.user
    if (!user) throw createError(500)
    const { id, name, avatar, phone, email } = user

    const response = { id, name, avatar, phone, email }
    return res.json(response)
  }
}
