import { TAlbums } from 'db/schema'
import { TPaginationResponse } from '../helpers'

export interface IAlbumsRepository {
  getAll: TGetAllFn
}

export type TGetAllFn = (params: TPaginationParams) => Promise<TGetAllResponse>

export type TPaginationParams = { limit: number; offset: number }
export type TGetAllResponse = TPaginationResponse<'albums', TAlbums>
