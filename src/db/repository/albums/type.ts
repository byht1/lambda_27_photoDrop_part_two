import { TAlbums } from 'db/schema'
import { TPaginationResponse, TPaginationParams } from '../helpers'

export interface IAlbumsRepository {
  getAll: TGetAllFn
}

export type TGetAllFn = (params: TPaginationParams) => Promise<TGetAlbumsResponse>

export type TGetAlbumsResponse = TPaginationResponse<'albums', TAlbums>
