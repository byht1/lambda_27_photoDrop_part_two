import { TelegramBotService, TokenService } from 'modules/lib';
import { IAuthService, TSingInFn, TVerifyFn } from './type';
import { UsersRepository } from 'db/repository';
import { createError, messageError } from 'helpers';

export class AuthService implements IAuthService {
  constructor(
    private telegramService = new TelegramBotService(),
    private tokenService = new TokenService(),
    private userModel = new UsersRepository()
  ) {}

  singIn: TSingInFn = async (phoneNumber) => {
    const isUserPromise = this.userModel.getPhone(phoneNumber);
    const verificationCodePromise = this.telegramService.sendVerificationCode(phoneNumber);

    const [isUser, verificationCode] = await Promise.all([isUserPromise, verificationCodePromise]);
    const verificationData = { verificationCode, numberVerification: 1 };

    if (isUser) {
      await this.userModel.addVerification(isUser.id, verificationData);
    } else {
      await this.userModel.create({ phone: phoneNumber, ...verificationData });
    }

    return verificationCode;
  };

  verify: TVerifyFn = async ({ code, phoneNumber }) => {
    const user = await this.userModel.getPhone(phoneNumber);
    if (!user) throw createError(400, messageError.notUser);
    const { verificationCode, id: userId } = user;

    const verifyCode = +code === verificationCode;
    if (!verifyCode) {
      throw createError(400, messageError.invalidVerificationCode);
    }

    const token = this.tokenService.createToken(userId);
    await this.userModel.updateToken(userId, {
      token,
      numberVerification: 0,
      verificationCode: null,
    });

    return { token };
  };
}
