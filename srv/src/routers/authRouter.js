import { Router } from 'express'
import { userCreate } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post('/signin')
authRouter.post('/signup', userCreate)
authRouter.get('/signout')
authRouter.get('/refresh')
