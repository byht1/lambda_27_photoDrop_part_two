import { AuthService } from './auth.service'
import {
  IAuthController,
  TBreakpointName,
  TRegenerateSelfieRoutFn,
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

    const token = await this.authService.verify(verifyDto)

    return res.json(token)
  }

  regenerateVerificationCode: TRegenerateVerificationCodeRoutFn = async (req, res) => {
    const { phoneNumber } = req.body

    const code = await this.authService.regenerateVerificationCode(phoneNumber)

    return res.send(code)
  }

  addSelfie: TRegenerateSelfieRoutFn = async (req, res) => {
    const files = req.files as Express.Multer.File[]
    console.log('🚀  AuthController  files:', files)
    return res
  }
}
