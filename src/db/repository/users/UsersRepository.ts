import { getDrizzle } from 'db/connectDB'
import {
  IPhotosRepository,
  TUpdateTokenFn,
  TAddVerificationFn,
  TCreateFn,
  TGetPhoneFn,
  TUpdatePrivateFn,
  TGetByIdFn,
} from './type'
import { eq } from 'drizzle-orm'
import { users } from 'db/schema'
import { usersSelfie } from 'db/schema/usersSelfie'

export class UsersRepository implements IPhotosRepository {
  private db = getDrizzle()
  private table = users
  private selfieTable = usersSelfie

  create: TCreateFn = async (userData) => {
    const user = await this.db.insert(this.table).values(userData).returning()
    return user[0]
  }

  getById: TGetByIdFn = async (searchUserId: string) => {
    const { id } = this.table
    const user = await this.db.select().from(this.table).where(eq(id, searchUserId))
    return user[0]
  }

  getPhone: TGetPhoneFn = async (searchPhone) => {
    const { phone } = this.table
    const user = await this.db.select().from(this.table).where(eq(phone, searchPhone))
    return user[0]
  }

  addVerification: TAddVerificationFn = async (...args) => {
    return await this.updateUser(...args)
  }

  updateToken: TUpdateTokenFn = async (...args) => {
    return await this.updateUser(...args)
  }

  private updateUser: TUpdatePrivateFn = async (searchId, updateData) => {
    const { id } = this.table
    const user = await this.db
      .update(this.table)
      .set(updateData)
      .where(eq(id, searchId))
      .returning()

    return user[0]
  }
}
