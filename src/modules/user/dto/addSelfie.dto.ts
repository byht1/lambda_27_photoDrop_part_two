import { TypeOf, z } from 'zod'

const filenameSchema = z.string().regex(/^[^/\\]*\.(png|jpg|jpeg|gif|bmp|svg|webp)$/)
export const addPhotosDto = z.object({
  photos: z.array(filenameSchema),
})

export type TAddPhotosDto = TypeOf<typeof addPhotosDto>
