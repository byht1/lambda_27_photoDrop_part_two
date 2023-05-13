// AUTH
import authSingIn from './auth/singIn.json'
import authVerify from './auth/verify.json'
import authRegenerate from './auth/regenerate.json'

// ALBUMS
import albums from './albums/albums.json'
import albumById from './albums/albumById.json'
import userMark from './albums/userMark.json'

// USER
import userSelfie from './user/selfie.json'
import setAvatar from './user/setAvatar.json'

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
  ...userMark,
  // USER
  ...userSelfie,
  ...setAvatar,
  // PAYMENT
  ...payment,
}
