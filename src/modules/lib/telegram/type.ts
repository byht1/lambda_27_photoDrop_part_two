export interface ITelegramBotService {
  sendVerificationCode: TSendVerificationCodeFn;
}

export type TSendVerificationCodeFn = (...args: TArgumentsGenerateMessage) => Promise<void>;
export type TGenerateMessage = (...args: TArgumentsGenerateMessage) => string;

type TArgumentsGenerateMessage = [string, number];
