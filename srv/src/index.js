import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import { genConnectionOptions, genConnectionString } from './db/dbActions.js'
import {
  API_VERSION,
  APP_PORT, CORS_ORIGIN,
  MONGO_CA_PATH,
  MONGO_CLIENT_CRT_PATH,
  MONGO_HOST,
  MONGO_PORT,
  MORGAN_ENV,
} from './helpers/constants.js'
import { authRouter } from './routers/authRouter.js'
import { gameRouter } from './routers/gameRouter.js'
import { checkAuth } from './middlewares/authMiddleware.js'
import { userRouter } from './routers/userRouter.js'
import { initializeSocketService } from './services/socketService.js'

const app = express()
const httpServer = http.createServer(app)

initializeSocketService(httpServer)

app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}))

app.use(morgan(MORGAN_ENV))
app.use(express.json())
app.use(cookieParser())

app.use(`/api/v${API_VERSION}/auth`, authRouter)
app.use(`/api/v${API_VERSION}/game`, gameRouter)
app.use(`/api/v${API_VERSION}/user`, userRouter)
app.use('/resources/cards/images', checkAuth, express.static('resources/cards'))
const startApp = async () => {
  try {
    const mongoConnectionString = genConnectionString(MONGO_HOST, MONGO_PORT)
    const mongoConnectionOptions = genConnectionOptions(MONGO_CA_PATH, MONGO_CLIENT_CRT_PATH)
    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoConnectionString, mongoConnectionOptions)
    console.log('DB connected')
    try {
      httpServer.listen(APP_PORT, '0.0.0.0', () => {
        console.log('Server has been started on port:', APP_PORT)
      })
    } catch (appError) {
      console.error(`Failed to start app on port ${APP_PORT}`)
    }
  } catch (dbError) {
    console.error(`Failed to connect to MongoDB ${dbError}`)
  }
}

startApp()
