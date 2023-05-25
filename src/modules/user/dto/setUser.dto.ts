import { phoneNumberValidate } from 'modules/dto/phoneNumberValidate'
import { z } from 'zod'

export type TSetUserDto = {
  phoneNumber?: string
  avatar?: string
  name?: string
}

export const setUserDto = z.object({
  phoneNumber: phoneNumberValidate,
  avatar: z.string().optional(),
  name: z.string().optional(),
})
