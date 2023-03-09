import { Router } from 'express'
import { checkAuth } from '../middlewares/authMiddleware.js'
import {
  userChangeEmail,
  userChangePassword, userGetGames, userGetInfo, userSetAvatar,
} from '../controllers/userController.js'

export const userRouter = new Router()

userRouter.put('/password', checkAuth, userChangePassword)
userRouter.put('/avatar', checkAuth, userSetAvatar)
userRouter.put('/email', checkAuth, userChangeEmail)
userRouter.get('/', checkAuth, userGetInfo)
userRouter.get('/games', checkAuth, userGetGames)
