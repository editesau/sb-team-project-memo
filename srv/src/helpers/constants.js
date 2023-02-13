import * as dotenv from 'dotenv'

dotenv.config()

export const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1'
export const MONGO_PORT = process.env.MONGO_PORT || 27017
export const MONGO_CA_PATH = process.env.MONGO_CA_PATH || undefined
export const MONGO_CLIENT_CRT_PATH = process.env.MONGO_CLIENT_CRT_PATH || undefined

export const MORGAN_ENV = process.env.MORGAN_ENV || 'dev'
export const API_VERSION = process.env.API_VERSION || 1
export const APP_PORT = process.env.APP_PORT || 5051

export const BCRYPT_SALT = process.env.BCRYPT_SALT

export const JWT_SECRET = process.env.JWT_SECRET

export const JWT_ACCESS_LIFE = process.env.JWT_ACCESS_LIFE

export const JWT_REFRESH_LIFE = process.env.JWT_REFRESH_LIFE
