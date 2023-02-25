import * as bcrypt from 'bcrypt'
import {
  dbChangeUserPassword, dbGetUser, dbGetUserGames, dbSetUserAvatar,
} from '../db/dbActions.js'

export const userChangePassword = (req, res) => {
  const userId = req.userId
  const currentPassword = req.body.currentPassword
  const newPassword = req.body.newPassword

  try {
    const user = dbGetUser(userId)
    if (user) {
      const isPasswordValid = bcrypt.compare(currentPassword, user.password)
      if (isPasswordValid) {
        const updatedUser = dbChangeUserPassword(userId, newPassword)
        if (updatedUser) {
          res.sendStatus(200)
        } else {
          res.status(400).json({ message: 'Filed to update a user' })
        }
      } else {
        res.status(400).json({ message: 'Password incorrect' })
      }
    } else {
      res.status(401).json({ message: 'Cant find user with provided ID' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const userSetAvatar = (req, res) => {
  const userId = req.userId
  const avatarUrl = req.body.avatarUrl

  try {
    const updatedUser = dbSetUserAvatar(userId, avatarUrl)
    if (updatedUser) {
      res.sendStatus(200)
    } else {
      res.status(400).json({ message: 'Filed to update a user' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const userGetInfo = async (req, res) => {
  const userId = req.userId

  try {
    const userFromDb = await dbGetUser(userId)
    if (userFromDb) {
      const { password, userData } = userFromDb
      res.json({ userData })
    } else {
      res.status(400).json({ message: 'User not found' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}

export const userGetGames = async (req, res) => {
  const userId = req.userId

  try {
    const userGamesFromDb = dbGetUserGames(userId)
    if (userGamesFromDb) {
      res.json({ games: userGamesFromDb })
    } else {
      res.status(400).json({ message: 'Games not found' })
    }
  } catch (dbError) {
    res.status(500).json({ message: dbError.message })
  }
}