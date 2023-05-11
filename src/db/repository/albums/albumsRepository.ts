import { TableAlbums, albums } from 'db/schema'
import { CountPagination } from '../helpers'
import { IAlbumsRepository, TGetAllFn } from './type'

export class AlbumsRepository extends CountPagination<TableAlbums> implements IAlbumsRepository {
  constructor() {
    super(albums)
  }

  getAll: TGetAllFn = async ({ limit, offset }) => {
    const maxElementPromise = this.getMaxElementsCount(limit)
    const albumPromise = this.db.select().from(this.table).offset(offset).limit(limit)
    const [albums, maxPage] = await Promise.all([albumPromise, maxElementPromise])
    return { maxPage, albums }
  }
}
