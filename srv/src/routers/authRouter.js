import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/signin')
authRouter.post('/signup')
authRouter.get('/signout')
authRouter.get('/refresh')
