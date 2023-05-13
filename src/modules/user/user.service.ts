import { readFile, rm } from 'fs/promises'
import { join as pathJoin } from 'path'
import { S3Service } from 'AWS'
import { IUserService, TRegenerateAvatarFn, TRegenerateSelfieFn } from './type'
import { UsersRepository } from 'db/repository'

export class UserService implements IUserService {
  private s3Service = new S3Service()
  private userModel = new UsersRepository()

  addSelfie: TRegenerateSelfieFn = async (files, userId) => {
    const upload = files.map(async (file) => {
      file.buffer = await readFile(file.path)
      return {
        url: await this.s3Service.uploadFiles(file, 'selfie', userId),
        userId,
      }
    })

    const processedFiles = await Promise.all(upload)
    const URLs = await this.userModel.addSelfie(processedFiles)
    return URLs
  }
  setAvatar: TRegenerateAvatarFn = async (...args) => {
    const user = await this.userModel.setAvatar(...args)
    return { avatar: user.avatar || '' }
  }

  clearDirectory = async (dir: string) => {
    const directory = pathJoin(__dirname, `../../temporary/${dir}`)

    await rm(directory, { recursive: true })
  }
}
