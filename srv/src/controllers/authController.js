import {
  dbClearRefreshToken, dbCreateUser, dbGetUser, dbLoginUser, dbSetRefreshToken,
} from '../db/dbActions.js'
import { createAccessToken, createRefreshToken } from '../services/jwtService.js'

/** Create user with parameters provided in request body in JSON
 * send statuses to client:
 * 200 - user created, body {_id, email}
 * 409 - user already exists, body {message}
 * 500 - another DB error, body {message}
 * @param req request object from express
 * @param res response to send client
 * @return {void}
 */
export const userCreate = async (req, res) => {
  const { email, password, userName } = req.body
  try {
    const result = await dbCreateUser({ email, password, userName })
    const { refreshToken, password: _, ...userData } = result._doc
    res.status(200).json(userData)
  } catch (dbError) {
    if (dbError.message.indexOf('duplicate') !== -1) {
      res.status(409).json({ message: 'User already exists' })
    } else {
      res.status(500).json({ message: dbError.message })
    }
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    const userId = await dbLoginUser({ email, password })
    if (userId) {
      const accessToken = createAccessToken({ userId })
      const refreshToken = createRefreshToken({ userId })
      await dbSetRefreshToken(userId, refreshToken)
      res
        .cookie('refresh_token', refreshToken, { httpOnly: true })
        .status(200)
        .json({ accessToken })
    } else {
      res.status(400).json({ message: 'Incorrect email or password' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const userLogout = async (req, res) => {
  try {
    const dbResult = await dbClearRefreshToken(req.userId)
    if (dbResult) {
      res
        .clearCookie('refresh_token')
        .status(200).json({ message: 'Successfully logout' })
    } else {
      res.sendStatus(400)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const userAuthRefresh = async (req, res) => {
  const userId = req.userId
  try {
    const dbUser = await dbGetUser(userId)
    if (dbUser.refreshToken === req.refreshToken) {
      const accessToken = createAccessToken({ userId })
      const refreshToken = createRefreshToken({ userId })
      await dbSetRefreshToken(userId, refreshToken)
      res
        .cookie('refresh_token', refreshToken, { httpOnly: true })
        .status(200)
        .json({ accessToken })
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
