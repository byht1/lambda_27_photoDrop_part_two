import { validateMessage } from 'helpers';
import validator from 'validator';
import { z } from 'zod';

export type TSingInDto = {
  phoneNumber: string;
};

export const singInDto = z.object({
  phoneNumber: z.string().refine(
    (str) => validator.isMobilePhone(str, 'any', { strictMode: true }),
    () => ({
      message: validateMessage.phoneNumber,
    })
  ),
});
