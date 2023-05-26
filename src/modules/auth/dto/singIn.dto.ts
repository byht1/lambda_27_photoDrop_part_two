import { phoneNumberValidate } from 'modules/dto/phoneNumberValidate'
import { TypeOf, z } from 'zod'

export const singInDto = z.object({
  phoneNumber: phoneNumberValidate,
})

export type TSingInDto = TypeOf<typeof singInDto>
