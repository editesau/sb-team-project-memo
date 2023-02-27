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
export const checkToken = (jwtToken) => jwt.verify(jwtToken, JWT_SECRET)
