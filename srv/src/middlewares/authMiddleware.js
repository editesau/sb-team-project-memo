import TokenExpiredError from 'jsonwebtoken/lib/TokenExpiredError.js'
import { checkToken } from '../services/jwtService.js'

export const checkAuth = (req, res, next) => {
  const { access_token: accessToken, refresh_token: refreshToken } = req.cookies
  if (accessToken && refreshToken) {
    try {
      const { userId } = checkToken(accessToken)
      req.userId = userId
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: 'Access token expired' })
      }
      return res.status(500).json({ message: error.message })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  return next()
}
