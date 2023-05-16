import { S3Service } from 'AWS'
import { IUserService, TRegenerateAvatarFn, TRegenerateSelfieFn } from './type'
import { UsersRepository } from 'db/repository'

export class UserService implements IUserService {
  private s3Service = new S3Service()
  private userModel = new UsersRepository()

  addSelfie: TRegenerateSelfieFn = async (files, userId) => {
    const URLs = files.map((filename, i) => {
      const [expansion] = filename.split('.').reverse()
      const path = `${i + 1}_${userId}.${expansion}`
      return this.s3Service.generatePresignedUrl(path)
    })

    return URLs
  }

  setAvatar: TRegenerateAvatarFn = async (...args) => {
    const user = await this.userModel.setAvatar(...args)
    return { avatar: user.avatar || '' }
  }
}
