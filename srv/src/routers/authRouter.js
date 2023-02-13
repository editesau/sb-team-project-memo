import { Router } from 'express'
import { userCreate, userLogin } from '../controllers/authController.js'
import { checkAuth } from '../middlewares/authMiddleware.js'

export const authRouter = Router()

authRouter.post('/signin', userLogin)
authRouter.post('/signup', userCreate)
authRouter.get('/signout')
authRouter.get('/refresh', checkAuth)
