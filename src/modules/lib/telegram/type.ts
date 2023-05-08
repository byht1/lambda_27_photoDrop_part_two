export interface ITelegramBotService {
  sendVerificationCode: TSendVerificationCodeFn;
}

export type TSendVerificationCodeFn = (phoneNumber: string) => Promise<number>;
export type TGenerateMessage = (phoneNumber: string, verificationCode: number) => string;
