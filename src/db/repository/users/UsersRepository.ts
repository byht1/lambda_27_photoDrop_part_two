import { getDrizzle } from 'db/connectDB'
import {
  IPhotosRepository,
  TUpdateTokenFn,
  TAddVerificationFn,
  TCreateFn,
  TGetPhoneFn,
  TUpdatePrivateFn,
} from './type'
import { eq } from 'drizzle-orm'
import { users } from 'db/schema'

export class UsersRepository implements IPhotosRepository {
  constructor(private db = getDrizzle(), private table = users) {}

  create: TCreateFn = async (userData) => {
    const user = await this.db.insert(this.table).values(userData).returning()
    return user[0]
  }

  getPhone: TGetPhoneFn = async (searchPhone) => {
    const { phone } = this.table
    const user = await this.db.select().from(this.table).where(eq(phone, searchPhone))
    return user[0]
  }

  addVerification: TAddVerificationFn = async (...args) => {
    return await this.update(...args)
  }

  updateToken: TUpdateTokenFn = async (...args) => {
    return await this.update(...args)
  }

  private update: TUpdatePrivateFn = async (searchId, updateData) => {
    const { id } = this.table
    const user = await this.db
      .update(this.table)
      .set(updateData)
      .where(eq(id, searchId))
      .returning()

    return user[0]
  }
}
