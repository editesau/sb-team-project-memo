import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import {
  MONGO_CA_PATH, MONGO_CLIENT_CRT_PATH, MONGO_HOST, MONGO_PORT,
} from '../helpers/constants.js'
import UserSchema from './models/UserSchema.js'

dotenv.config()

export const genConnectionString = () => {
  if (!MONGO_CA_PATH) throw Error('No mongo CA Path in environment')
  if (!MONGO_CLIENT_CRT_PATH) throw Error('No mongo client crt Path in environment')

  return `mongodb://${MONGO_HOST}:${MONGO_PORT}/`
}

export const genConnectionOptions = () => ({
  tls: true,
  tlsInsecure: true,
  tlsCAFile: MONGO_CA_PATH,
  tlsCertificateKeyFile: MONGO_CLIENT_CRT_PATH,
  authMechanism: 'MONGODB-X509',
})

export const createUser = (user) => {
  const User = mongoose.model('users', UserSchema)
  const newUser = new User(user)
  return newUser.save() // promise
}

export const setRefreshToken = (userId, token) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate({ userId }, { refreshToken: token }) // promise
}

export const clearRefreshToken = (userId) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate({ userId }, { refreshToken: '' })
}
