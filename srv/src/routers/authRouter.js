import { Router } from 'express'
import { userCreate, userLogin, userLogout } from '../controllers/authController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'

export const authRouter = Router()

authRouter.post('/signin', userLogin)
authRouter.post('/signup', userCreate)
authRouter.post('/signout', checkAuth, userLogout)
authRouter.get('/refresh', checkAuth)
