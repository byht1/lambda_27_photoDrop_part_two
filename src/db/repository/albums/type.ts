import { TAlbums } from 'db/schema'
import { TPaginationResponse, TPaginationParams } from '../helpers'

export interface IAlbumsRepository {
  getAll: TGetAllFn
  getById: TGetByIdFn
}

export type TGetAllFn = (params: TPaginationParams) => Promise<TGetAlbumsResponse>
export type TGetByIdFn = (albumId: string) => Promise<TAlbums | undefined>

export type TGetAlbumsResponse = TPaginationResponse<'albums', TAlbums>
