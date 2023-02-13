import jwt from 'jsonwebtoken'
import { JWT_ACCESS_LIFE, JWT_REFRESH_LIFE, JWT_SECRET } from '../helpers/constants.js'

export const createAccessToken = (payload) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: +JWT_ACCESS_LIFE,
  },
)

export const createRefreshToken = (payload) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: +JWT_REFRESH_LIFE,
  },
)
export const checkToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, JWT_SECRET)
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
