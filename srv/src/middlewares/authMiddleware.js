import TokenExpiredError from 'jsonwebtoken/lib/TokenExpiredError.js'
import jwt from 'jsonwebtoken'
import { checkToken } from '../services/jwtService.js'

export const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401)
  }
  const accessToken = req.headers.authorization.split(' ')[1]
  if (accessToken) {
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
    return res.sendStatus(401)
  }
  return next()
}

export const checkRefreshToken = (req, res, next) => {
  const { refresh_token: refreshToken } = req.cookies
  if (refreshToken) {
    try {
      const { userId } = checkToken(refreshToken)
      req.userId = userId
      req.refreshToken = refreshToken
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: 'Refresh token expired' })
      }
      return res.status(500).json({ message: error.message })
    }
  } else {
    return res.sendStatus(401)
  }
  return next()
}

export const socketAuthMiddleware = (socket, next) => {
  if (socket.handshake.auth && socket.handshake.auth.token) {
    const { token } = socket.handshake.auth
    try {
      const { userId } = checkToken(token)
      // eslint-disable-next-line no-param-reassign
      socket.userId = userId
      next()
    } catch (e) {
      next(new Error('Unauthorized'))
    }
  } else {
    next(new Error('Unauthorized'))
  }
}
