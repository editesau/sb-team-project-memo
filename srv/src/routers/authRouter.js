import { Router } from 'express'
import {
  userAuthRefresh, userCreate, userLogin, userLogout,
} from '../controllers/authController.js'
import { checkAuth, checkRefreshToken } from '../middlewares/authMiddleware.js'

export const authRouter = Router()

authRouter.post('/signin', userLogin)
authRouter.post('/signup', userCreate)
authRouter.post('/signout', checkAuth, userLogout)
authRouter.post('/refresh', checkRefreshToken, userAuthRefresh)
