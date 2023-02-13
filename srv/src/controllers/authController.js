import { dbCreateUser, dbLoginUser, dbSetRefreshToken } from '../db/dbActions.js'
import { createAccessToken, createRefreshToken } from '../services/jwtService.js'

/** Create user with parameters provided in request body in JSON
 * send statuses to client:
 * 200 - user created, body {_id, email}
 * 409 - user already exists, body {message}
 * 500 - another DB error, body {message}
 * @param req request object from express
 * @param res response to send client
 * @return {Promise}
 */
export const userCreate = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await dbCreateUser({ email, password })
    const { refreshToken, password: _, ...userData } = result._doc
    res.status(200).json(userData)
  } catch (dbError) {
    if (dbError.message.indexOf('duplicate')) {
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
      res.cookie('access_token', accessToken, { httpOnly: true })
        .cookie('refresh_token', refreshToken, { httpOnly: true })
        .status(200)
        .json('Successfully login')
    }
  } catch (dbError) {
    console.log(dbError)
  }
}
