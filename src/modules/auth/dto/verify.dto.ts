import { TypeOf, z } from 'zod'
import validator from 'validator'
import { validateMessage } from 'helpers'
import { phoneNumberValidate } from 'modules/dto/phoneNumberValidate'

export const verifyDto = z.object({
  phoneNumber: phoneNumberValidate,
  code: z
    .string()
    .length(6, validateMessage.length(6))
    .refine(
      (str) => validator.isNumeric(str),
      () => ({
        message: validateMessage.isNumeric,
      })
    ),
})

export type TVerifyDto = TypeOf<typeof verifyDto>
