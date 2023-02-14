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
 * @return {Promise<void>}
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
/** Function get email and password from request body and invoke check this credentials in DB
 * send statuses to client:
 * 200 - user login successful (set-cookie: refresh_token, body {accessToken})
 * 400 - incorrect email or password body {message}
 * 500 - another DB error, body {message}
 * @param req Request Obj
 * @param res Response Obj
 * @return {Promise<void>}
 */
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
/** Function get userId from request and invoke clear refresh_token for this user in DB
 * send statuses to client:
 * 200 - user logout successful, body {message}
 * 400 - Bad request (refresh_token with provided userId not found
 * 500 - another DB error, body {message}
 * @param req Request Obj
 * @param res Response Obj
 * @return {Promise<void>}
 */
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
/** Function get userId from request and invoke generate
 * new JWT pair and then save new refresh_token for this user in DB
 * send statuses to client:
 * 200 - refresh successful, (set-cookie: refresh_token, body {accessToken})
 * 401 - refresh_token with provided userId not found
 * 500 - another DB error, body {message}
 * @param req Request Obj
 * @param res Response Obj
 * @return {Promise<void>}
 */
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
