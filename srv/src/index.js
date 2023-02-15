import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { genConnectionOptions, genConnectionString } from './db/dbActions.js'
import {
  API_VERSION,
  APP_PORT,
  MONGO_CA_PATH,
  MONGO_CLIENT_CRT_PATH,
  MONGO_HOST,
  MONGO_PORT,
  MORGAN_ENV,
} from './helpers/constants.js'
import { authRouter } from './routers/authRouter.js'
import { gameRouter } from './routers/gameRouter.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan(MORGAN_ENV))
app.use(express.json())
app.use(cookieParser())

app.use(`/api/v${API_VERSION}/auth`, authRouter)
app.use(`/api/v${API_VERSION}/game`, gameRouter)

const startApp = async () => {
  try {
    const mongoConnectionString = genConnectionString(MONGO_HOST, MONGO_PORT)
    const mongoConnectionOptions = genConnectionOptions(MONGO_CA_PATH, MONGO_CLIENT_CRT_PATH)
    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoConnectionString, mongoConnectionOptions)
    console.log('DB connected')
    try {
      app.listen(APP_PORT, '0.0.0.0', () => {
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
