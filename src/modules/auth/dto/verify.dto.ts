import { z } from 'zod';
import validator from 'validator';
import { validateMessage } from 'helpers';

export type TVerifyDto = {
  phoneNumber: string;
  code: string;
};

export const verifyDto = z.object({
  phoneNumber: z.string().refine(
    (str) => validator.isMobilePhone(str, 'any', { strictMode: true }),
    () => ({
      message: validateMessage.phoneNumber,
    })
  ),
  code: z
    .string()
    .length(6, validateMessage.length(6))
    .refine(
      (str) => validator.isNumeric(str),
      () => ({
        message: validateMessage.isNumeric,
      })
    ),
});
