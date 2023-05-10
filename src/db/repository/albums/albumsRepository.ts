import { TableAlbums, albums } from 'db/schema'
import { CountPagination } from '../helpers'
import { IAlbumsRepository, TGetAllFn } from './type'

export class AlbumsRepository extends CountPagination<TableAlbums> implements IAlbumsRepository {
  constructor() {
    super(albums)
  }

  getAll: TGetAllFn = async ({ limit, offset }) => {
    const maxElementPromise = this.getMaxElementsCount()
    const albumPromise = this.db.select().from(this.table).offset(offset).limit(limit)
    const [albums, maxElement] = await Promise.all([albumPromise, maxElementPromise])
    const maxPage = Math.ceil(maxElement / limit)
    return { maxPage, albums }
  }
}
