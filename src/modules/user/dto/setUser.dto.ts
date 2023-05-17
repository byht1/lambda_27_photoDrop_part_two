import { z } from 'zod'

export type TSetUserDto = {
  avatar?: string
  name?: string
}

export const setUserDto = z.object({
  avatar: z.string().optional(),
  name: z.string().optional(),
})
