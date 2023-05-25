import { validateMessage } from 'helpers'
import validator from 'validator'
import { z } from 'zod'

export const phoneNumberValidate = z.string().refine(
  (str) => validator.isMobilePhone(str, 'any', { strictMode: true }),
  () => ({
    message: validateMessage.phoneNumber,
  })
)
