import { getDrizzle } from 'db/connectDB'
import { sql } from 'drizzle-orm'
import { TTable } from './type'

export class CountPagination<T> {
  protected db = getDrizzle()

  constructor(protected table: TTable<T>) {}

  protected getMaxElementsCount = async (limit: number): Promise<number> => {
    const [maxDBElements] = await this.db
      .select({ count: sql<number>`count(*)`.mapWith((it) => +it) })
      .from(this.table)

    const maxPage = Math.ceil(maxDBElements.count / limit)

    return maxPage
  }
}
