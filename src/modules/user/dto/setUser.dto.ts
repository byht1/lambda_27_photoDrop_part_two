import { phoneNumberValidate } from 'modules/dto/phoneNumberValidate'
import { TypeOf, z } from 'zod'

export const setUserDto = z.object({
  phoneNumber: phoneNumberValidate.optional(),
  avatar: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
})

export type TSetUserDto = TypeOf<typeof setUserDto>
