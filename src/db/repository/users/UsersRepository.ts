import { eq } from 'drizzle-orm'
import { getDrizzle } from 'db/connectDB'
import { userPurchases, users, usersSelfie } from 'db/schema'
import {
  IPhotosRepository,
  TUpdateTokenFn,
  TAddVerificationFn,
  TCreateFn,
  TGetPhoneFn,
  TUpdatePrivateFn,
  TGetByIdFn,
  TAddPurchasedPhotoFn,
  TSetUserDataFn,
} from './type'

export class UsersRepository implements IPhotosRepository {
  private db = getDrizzle()
  private table = users
  private selfieTable = usersSelfie
  private userPurchasesTable = userPurchases

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

  setUserData: TSetUserDataFn = async (...args) => {
    return await this.updateUser(...args)
  }

  addPurchasedPhoto: TAddPurchasedPhotoFn = async (data) => {
    await this.db.insert(this.userPurchasesTable).values(data)
    return
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
