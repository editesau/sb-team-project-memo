import { Router } from 'express'
import { checkAuth } from '../middlewares/authMiddleware.js'
import { userChangePassword, userGetInfo, userSetAvatar } from '../controllers/userController.js'

export const userRouter = new Router()

userRouter.put('/password', checkAuth, userChangePassword)
userRouter.put('/user/avatar', checkAuth, userSetAvatar)
userRouter.get('/', checkAuth, userGetInfo)
