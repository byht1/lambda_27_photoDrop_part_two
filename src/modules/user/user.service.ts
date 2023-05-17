import { S3Service } from 'AWS'
import { IUserService, TAddSelfieFn, TSetUserDataFn } from './type'
import { UsersRepository } from 'db/repository'

export class UserService implements IUserService {
  private s3Service = new S3Service()
  private userModel = new UsersRepository()

  addSelfie: TAddSelfieFn = async (files, userId) => {
    const URLs = files.map((filename, i) => {
      const [expansion] = filename.split('.').reverse()
      const path = `${i + 1}_${userId}.${expansion}`
      return this.s3Service.generatePresignedUrl(path)
    })

    return URLs
  }

  setUserData: TSetUserDataFn = async (...args) => {
    const { id, name, phone, avatar } = await this.userModel.setUserData(...args)

    return { id, name, phone, avatar }
  }
}
