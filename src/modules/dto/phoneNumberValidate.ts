import { validateMessage } from 'helpers'
import { z } from 'zod'

export const phoneNumberValidate = z
  .string()
  .regex(/^\+\d{1,3}\d{3}\d{3}\d{2}\d{2}$/, { message: validateMessage.phoneNumber })
