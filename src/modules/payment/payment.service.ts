import { StripeService, TNewPurchaseOptions } from 'modules/lib'
import { IPaymentService, TCreatePaymentFn, THookPaymentFn } from './type'
import { AlbumsRepository, PhotosRepository, UsersRepository } from 'db/repository'
import { createError, generateRandomPrice } from 'helpers'

export class PaymentService implements IPaymentService {
  private stripeService = new StripeService()
  private albumsModel = new AlbumsRepository()
  private photoModel = new PhotosRepository()
  private userModel = new UsersRepository()

  createPayment: TCreatePaymentFn = async (userId, purchaseDto) => {
    const { albumId, cancelUrl, successUrl } = purchaseDto
    const album = await this.albumsModel.getById(albumId)
    if (!album) throw createError(400, 'Album is not exist')
    const { name } = album

    const optionsPayment: TNewPurchaseOptions = {
      name,
      price: generateRandomPrice(),
      quantity: 1,
      cancelUrl,
      successUrl,
      payload: {
        userId,
        albumId,
      },
    }
    const receiptForPayment = await this.stripeService.newPurchase(optionsPayment)
    return receiptForPayment
  }

  hookPayment: THookPaymentFn = async (eventObj) => {
    const paymentInformation = this.stripeService.webhook(eventObj)

    const { isSuccess, payload } = paymentInformation
    if (!isSuccess) return

    const { userId, albumId } = payload
    const photos = await this.photoModel.getAllForAlbums(albumId)
    const photoOwner = photos.map((photo) => ({ ...photo, userId }))
    await this.userModel.addPurchasedPhoto(photoOwner)
  }
}
