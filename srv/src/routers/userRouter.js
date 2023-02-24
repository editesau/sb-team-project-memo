import { Router } from 'express'
import { checkAuth } from '../middlewares/authMiddleware.js'
import { userChangePassword } from '../controllers/userController.js'

const userRouter = new Router()

userRouter.put('/user/password', checkAuth, userChangePassword)
