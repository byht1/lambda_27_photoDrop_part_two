import { z } from 'zod'

export type TSetAvatarDto = {
  avatar: string
}

export const setAvatarDto = z.object({
  phoneNumber: z.string(),
})
