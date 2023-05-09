import { getEnv } from 'helpers';
import TelegramBot from 'node-telegram-bot-api';
import { ITelegramBotService, TGenerateMessage, TSendVerificationCodeFn } from './type';

export class TelegramBotService extends TelegramBot implements ITelegramBotService {
  CHAT_ID = getEnv('TELEGRAM_CHAT_ID');

  constructor() {
    super(getEnv('TELEGRAM_BOT_TOKEN'), { polling: true });
  }

  sendVerificationCode: TSendVerificationCodeFn = async (...args) => {
    const message = this.generateMessage(...args);
    await this.sendMessage(this.CHAT_ID, message, { parse_mode: 'HTML' });
  };

  private generateMessage: TGenerateMessage = (phoneNumber, verificationCode) => {
    const verificationRequest = `The mobile number for which verification was requested: ${phoneNumber} \n`;
    const verificationCodeMessage = `Verification code: <strong>${verificationCode}</strong>`;

    return verificationRequest + verificationCodeMessage;
  };
}
