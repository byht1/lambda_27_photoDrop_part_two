import { phoneNumberValidate } from 'modules/dto/phoneNumberValidate'
import { z } from 'zod'

export type TSingInDto = {
  phoneNumber: string
}

export const singInDto = z.object({
  phoneNumber: phoneNumberValidate,
})
