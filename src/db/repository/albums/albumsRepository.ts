import { TableAlbums, albums } from 'db/schema'
import { CountPagination } from '../helpers'
import { IAlbumsRepository, TGetAllFn, TGetByIdFn } from './type'
import { eq } from 'drizzle-orm'

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

  getById: TGetByIdFn = async (searchAlbumId) => {
    const { id } = this.table
    const album = await this.db.select().from(this.table).where(eq(id, searchAlbumId))
    return album[0]
  }
}
