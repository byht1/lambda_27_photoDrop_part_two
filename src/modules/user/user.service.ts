import { S3Service } from 'AWS'
import { IUserService, TAddSelfieFn, TNewUserPhoneFn, TSetUserDataFn } from './type'
import { UsersRepository } from 'db/repository'
import { TelegramBotService, VerificationTokenService } from 'modules/lib'
import { createError } from 'helpers'

export class UserService implements IUserService {
  private s3Service = new S3Service()
  private userModel = new UsersRepository()
  private telegramService = new TelegramBotService()
  private verificationTokenService = new VerificationTokenService()

  addSelfie: TAddSelfieFn = async (files, userId) => {
    const URLs = files.map((filename, i) => {
      const [expansion] = filename.split('.').reverse()
      const path = `selfie/temp/${i + 1}_${userId}.${expansion}`
      return this.s3Service.generatePresignedUrl(path)
    })

    return URLs
  }

  setUserData: TSetUserDataFn = async (userId, userDada) => {
    const newUserData = await this.newUserPhone(userDada)
    const { id, name, phone, avatar, email } = await this.userModel.setUserData(userId, {
      ...newUserData,
    })

    return { id, name, phone, avatar, email }
  }

  private newUserPhone: TNewUserPhoneFn = async ({ phoneNumber, ...params }) => {
    if (!phoneNumber) return { ...params }

    const isUser = await this.userModel.getPhone(phoneNumber)
    if (isUser) throw createError(400, 'The phone number is already in use')

    const { token: verificationToken, code: verificationCode } =
      this.verificationTokenService.createToken(1, { phone: phoneNumber })

    await this.telegramService.sendVerificationCode(phoneNumber, verificationCode)

    return { ...params, verificationToken }
  }
}
