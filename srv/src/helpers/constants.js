import * as dotenv from 'dotenv'

dotenv.config()

export const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1'
export const MONGO_PORT = process.env.MONGO_PORT || 27017
export const MONGO_CA_PATH = process.env.MONGO_CA_PATH || undefined
export const MONGO_CLIENT_CRT_PATH = process.env.MONGO_CLIENT_CRT_PATH || undefined