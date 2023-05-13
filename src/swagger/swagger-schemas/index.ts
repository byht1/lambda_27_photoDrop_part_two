import phoneNumber from './response/auth/phoneNumber.json'
import verifyCode from './response/auth/verifyCode.json'
import getAllAlbums from './response/albums/getAllAlbums.json'
import getAlbumById from './response/albums/getAlbumById.json'
import getUserMark from './response/albums/getUserMark.json'

// QUERY
import paginationQuery from './query/pagination.json'

//GLOBAL
import maxPage from './global/maxPage.json'
import album from './global/album.json'
import photo from './global/photo.json'

// HEADER
import authToken from './header/authToken.json'

export const schemas = {
  // HEADER
  ...authToken,
  // QUERY
  ...paginationQuery,
  // GLOBAL
  ...maxPage,
  ...album,
  ...photo,
  // BODY AND RESPONSE
  ...phoneNumber,
  ...verifyCode,
  ...getAllAlbums,
  ...getAlbumById,
  ...getUserMark,
}
