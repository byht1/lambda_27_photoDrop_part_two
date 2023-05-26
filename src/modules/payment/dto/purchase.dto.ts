import { TypeOf, z } from 'zod'

export const purchaseDto = z.object({
  albumId: z.string().uuid(),
  successUrl: z.string(),
  cancelUrl: z.string(),
})

export type TPurchaseDto = TypeOf<typeof purchaseDto>
