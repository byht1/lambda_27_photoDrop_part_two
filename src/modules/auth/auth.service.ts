import { TelegramBotService, TokenService, VerificationTokenService } from 'modules/lib'
import { IAuthService, TRegenerateVerificationCodeFn, TSingInFn, TVerifyFn } from './type'
import { UsersRepository } from 'db/repository'
import { createError, getEnv, messageError } from 'helpers'

export class AuthService implements IAuthService {
  constructor(
    private telegramService = new TelegramBotService(),
    private tokenService = new TokenService(),
    private verificationTokenService = new VerificationTokenService(),
    private userModel = new UsersRepository(),
    private limitRegeneration = getEnv('MAX_VERIFICATION_CODE_REGENERATIONS', '1')
  ) {}

  singIn: TSingInFn = async (phoneNumber) => {
    const isUser = await this.userModel.getPhone(phoneNumber)
    const { token: verificationToken, code: verificationCode } =
      this.verificationTokenService.createToken(1)

    const sendMessagePromise = this.telegramService.sendVerificationCode(
      phoneNumber,
      verificationCode
    )
    const operationDBPromise = isUser
      ? this.userModel.addVerification(isUser.id, { verificationToken, token: null })
      : this.userModel.create({ phone: phoneNumber, verificationToken })

    await Promise.all([sendMessagePromise, operationDBPromise])
    return verificationCode.toString()
  }

  verify: TVerifyFn = async ({ code, phoneNumber }) => {
    const user = await this.userModel.getPhone(phoneNumber)
    if (!user) throw createError(400, messageError.notUser)
    const { verificationToken, id: userId, avatar, phone, name, email } = user

    if (!verificationToken) throw createError(403, messageError.invalidVerificationCode)

    const { code: verificationCode, phone: newPhoneNumber } =
      await this.verificationTokenService.verify(verificationToken, () => this.verifyError(userId))

    const verifyCode = +code === verificationCode
    if (!verifyCode) throw createError(403, messageError.invalidVerificationCode)

    const token = this.tokenService.createToken(userId)
    await this.userModel.setUserData(userId, {
      token,
      verificationToken: null,
      ...(newPhoneNumber ? { phone: newPhoneNumber } : {}),
    })

    return {
      id: userId,
      token,
      avatar,
      phone: newPhoneNumber ? newPhoneNumber : phone,
      name,
      email,
    }
  }

  regenerateVerificationCode: TRegenerateVerificationCodeFn = async (phoneNumber) => {
    const user = await this.userModel.getPhone(phoneNumber)

    if (!user) throw createError(400, messageError.notUser)
    const { id: userId, verificationToken } = user

    if (!verificationToken) throw createError(400, messageError.invalidVerificationCode)

    const { code: verificationCode, attemptNumber } = await this.verificationTokenService.verify(
      verificationToken,
      () => this.verifyError(userId)
    )

    const isMaxLimitAttemptNumber = attemptNumber < this.limitRegeneration
    if (!isMaxLimitAttemptNumber) throw createError(400, messageError.maxLimitAttemptNumber)

    const { token: newVerificationToken, code: newVerificationCode } =
      this.verificationTokenService.createToken(2)

    const sendMessagePromise = this.telegramService.sendVerificationCode(
      phoneNumber,
      verificationCode
    )
    const operationDBPromise = this.userModel.addVerification(userId, {
      verificationToken: newVerificationToken,
      token: null,
    })

    await Promise.all([sendMessagePromise, operationDBPromise])

    return newVerificationCode.toString()
  }

  private verifyError = async (userId: string) => {
    await this.userModel.updateToken(userId, { token: null, verificationToken: null })
  }
}
