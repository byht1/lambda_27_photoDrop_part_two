import jwt from 'jsonwebtoken'
import {
  IVerificationTokenService,
  TCreateTokenFn,
  TDecodeFn,
  TPayloadVerificationToken,
  TVerifyFn,
} from './type'
import { createError, getEnv, messageError } from 'helpers'

export class VerificationTokenService implements IVerificationTokenService {
  private tokenKey = getEnv('TOKEN_SECRET_KEY')
  private expTime = getEnv('VERIFICATION_CODE_EXPIRY_TIME', '3m')

  createToken: TCreateTokenFn = (attemptNumber) => {
    const code = this.generateVerificationCode()
    const payload: TPayloadVerificationToken = { code, attemptNumber }
    const token = jwt.sign(payload, this.tokenKey, { expiresIn: this.expTime })
    console.log('🚀  createToken  this.tokenKey:', this.tokenKey)
    console.log('🚀  createToken  this.tokenKey:', this.tokenKey)
    return { token, code }
  }

  verify: TVerifyFn = async (token, errorFn) => {
    console.log('🚀  verify  token:', token)
    console.log('🚀  verify  this.tokenKey:', this.tokenKey)
    try {
      const payload = jwt.verify(token, this.tokenKey) as TPayloadVerificationToken
      return payload
    } catch (error) {
      console.log('🚀  VerificationTokenService  error:', error)
      if (errorFn) await errorFn()
      throw createError(403, messageError.invalidVerificationCodeTime)
    }
  }

  decode: TDecodeFn = (token) => {
    return jwt.decode(token) as TPayloadVerificationToken | null
  }

  private generateVerificationCode = (): number => {
    return Math.floor(Math.random() * 900000) + 100000
  }
}
