import { z } from 'zod'

export type TPurchaseDto = {
  albumId: string
  successUrl: string
  cancelUrl: string
}

export const purchaseDto = z.object({
  albumId: z.string().uuid(),
  successUrl: z.string(),
  cancelUrl: z.string(),
})
