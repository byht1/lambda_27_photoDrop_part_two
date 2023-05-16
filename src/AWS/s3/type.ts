export interface IS3Service {
  generatePresignedUrl: TGeneratePresignedUrlFn
}

export type TGeneratePresignedUrlFn = (pathToFile: string) => string
