import { UsersRepository } from 'db/repository'
import { createError } from 'helpers/error/createError'
import { TokenService } from 'modules/lib'
import { TMiddlewareFn } from 'type'

export class Auth {
  private userModel = new UsersRepository()
  private tokenService = new TokenService()

  validateToken: TMiddlewareFn = async (req, _, next) => {
    const { authorization = '' } = req.headers

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) {
      next(createError(403, 'Not authorized'))
    }

    try {
      const { id } = this.tokenService.verify(token)

      const user = await this.userModel.getById(id)
      if (!user?.token) throw new Error()
      req.user = user

      next()
    } catch (error) {
      next(createError(403, 'Not authorized'))
    }
  }
}

export const { validateToken } = new Auth()
