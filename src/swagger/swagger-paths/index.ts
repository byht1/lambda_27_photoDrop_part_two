// AUTH
import authSingIn from './auth/singIn.json'
import authVerify from './auth/verify.json'
import authRegenerate from './auth/regenerate.json'

// ALBUMS
import albums from './albums/albums.json'
import albumById from './albums/albumById.json'

// USER
import userSelfie from './user/selfie.json'
import setUser from './user/setUser.json'

// PAYMENT
import payment from './payment/payment.json'

export const paths = {
  // AUTH
  ...authSingIn,
  ...authVerify,
  ...authRegenerate,
  // ALBUMS
  ...albums,
  ...albumById,
  // USER
  ...userSelfie,
  ...setUser,
  // PAYMENT
  ...payment,
}
