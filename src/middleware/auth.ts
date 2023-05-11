import { UsersRepository } from 'db/repository'
import { createError } from 'helpers/error/createError'
import { TokenService } from 'modules/lib'
import { TMiddlewareFn } from 'type'

export class Auth {
  private userModel = new UsersRepository()
  private tokenService = new TokenService()

  validateToken: TMiddlewareFn = async (req, _, next) => {
    const { authorization = '' } = req.headers
    console.log('🚀  Auth  authorization:', authorization)

    const [bearer, token] = authorization.split(' ')
    console.log('🚀  Auth  token:', token)
    if (bearer !== 'Bearer' || !token) {
      next(createError(403, 'Not authorized'))
    }

    try {
      const { id } = this.tokenService.verify(token)

      const user = await this.userModel.getById(id)
      console.log('🚀  Auth  user:', user)
      if (!user?.token) throw new Error()
      req.user = user

      next()
    } catch (error) {
      next(createError(403, 'Not authorized'))
    }
  }
}

export const { validateToken } = new Auth()
