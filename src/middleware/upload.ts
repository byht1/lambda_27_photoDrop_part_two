import { Response, NextFunction } from 'express'
import { createError } from 'helpers/error/createError'
import multer from 'multer'
import { join as pathJoin } from 'path'
import { mkdir } from 'fs/promises'

export interface IUploadedFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export const uploadFiles = async (req: Req, res: Response, next: NextFunction) => {
  const user = req.user
  if (!user) throw createError(500)
  const temporaryDir = pathJoin(__dirname, `../temporary/${user.id}`)

  await mkdir(temporaryDir, { recursive: true })

  const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, temporaryDir)
    },
    filename: (req, file, cd) => {
      cd(null, file.originalname)
    },
  })

  const upload = multer({ storage: multerConfig })

  upload.array('photos')(req, res, (err) => {
    if (!req.files) {
      return next(createError(400, 'File is missing'))
    }
    if (err) {
      return next(err)
    }
    return next()
  })
}
