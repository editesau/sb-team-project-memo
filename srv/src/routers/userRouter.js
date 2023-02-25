import { Router } from 'express'
import { checkAuth } from '../middlewares/authMiddleware.js'
import { userChangePassword, userSetAvatar } from '../controllers/userController.js'

const userRouter = new Router()

userRouter.put('/user/password', checkAuth, userChangePassword)
userRouter.put('/user/avatar', checkAuth, userSetAvatar)
