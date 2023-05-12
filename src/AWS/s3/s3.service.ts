import { S3 } from 'aws-sdk'
import { getEnv } from 'helpers'
import { IS3Service, TUploadFilesFn, TGenerateParamsS3Fn, TUploadToS3Fn } from './type'
import { createError } from 'helpers/error/createError'

export enum ERootFolder {
  SELFIE = 'selfie',
}

export class S3Service implements IS3Service {
  private AWS_S3_BUCKET = getEnv('AWS_S3_BUCKET')

  private s3 = new S3({
    accessKeyId: getEnv('AWS_S3_ACCESS_KEY'),
    secretAccessKey: getEnv('AWS_S3_KEY_SECRET'),
    signatureVersion: 'v4',
  })

  uploadFiles: TUploadFilesFn = async (file, rootFolder, folder) => {
    const { filename, buffer, mimetype } = file
    const params = this.generateParamsS3(filename, buffer, rootFolder, mimetype, folder)
    return await this.uploadToS3(params)
  }

  private generateParamsS3: TGenerateParamsS3Fn = (...args) => {
    const [name, file, rootFolder, mimetype, folder] = args

    const dir = `${this.AWS_S3_BUCKET}/${rootFolder}/${folder}`

    const params = {
      Bucket: dir,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    }
    return params
  }

  private uploadToS3: TUploadToS3Fn = async (params) => {
    try {
      const s3Response = await this.s3.upload(params).promise()

      return s3Response.Location
    } catch (e) {
      throw createError(503, 'Error uploading file to the cloud. Please try again later.')
    }
  }
}
