import { TableAlbums, TablePhotos } from 'db/schema'

export type TTable<T> = T extends TableAlbums | TablePhotos ? T : never

type TMaxPage = { maxPage: number }
export type TPaginationResponse<K extends string, D> = TMaxPage & {
  [key in K]: D[]
}

export type TPaginationParams = { limit: number; offset: number }
