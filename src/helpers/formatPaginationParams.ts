import { TPaginationParams } from 'db/repository/helpers'
import { TPaginationQueryParams } from 'modules/albums/type'

export const formatQueryParams = (params: TPaginationQueryParams): TPaginationParams => {
  const { limit = 20, page = 1 } = params
  const limitElement = +limit
  const currentPage = +page
  const skip = (currentPage - 1) * limitElement

  return {
    limit: limitElement,
    offset: skip,
  }
}
