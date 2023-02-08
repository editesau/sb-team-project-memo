import { createUser } from '../db/dbActions.js'

export const userCreate = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await createUser({ email, password })
    // eslint-disable-next-line no-underscore-dangle
    const { refreshToken, password: _, ...userData } = result._doc
    res.status(200).json(userData)
  } catch (dbError) {
    if (dbError.message.indexOf('duplicate')) {
      res.status(400).json({ message: 'User already exists' })
    } else {
      res.status(500).json(dbError.message)
    }
  }
}
