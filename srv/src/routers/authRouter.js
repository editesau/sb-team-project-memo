import { Router } from 'express'
import { userCreate } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post('/signin', userCreate)
authRouter.post('/signup')
authRouter.get('/signout')
authRouter.get('/refresh')
