import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import {
  MONGO_CA_PATH, MONGO_CLIENT_CRT_PATH,
} from '../helpers/constants.js'
import UserSchema from './models/UserSchema.js'

dotenv.config()

/** Function to generate mongoDB connection URL
 *@param host {string} IP address or DNS hostname
 *@param port {string} mongoDB port
 *@return {string} mongodb URL: mongodb://host:port
 */
export const genConnectionString = (host, port) => {
  if (!MONGO_CA_PATH) throw Error('No mongo CA Path in environment')
  if (!MONGO_CLIENT_CRT_PATH) throw Error('No mongo client crt Path in environment')

  return `mongodb://${host}:${port}/`
}
/** Function to generate mongoDB connection options with x509 Auth
 *@param caCertPath {string} Full path to CA certificate
 *@param clientCertPath {string} Full path to client certificate
 *@return {Object} Object contains all needed options to secure connect with x509
 */
export const genConnectionOptions = (caCertPath, clientCertPath) => ({
  tls: true,
  tlsInsecure: true,
  tlsCAFile: caCertPath,
  tlsCertificateKeyFile: clientCertPath,
  authMechanism: 'MONGODB-X509',
})

/** Create user on running mongoose instance
 *@param user {Object} user object required fields - email, password
 *@return {Promise} mongoDB .save() promise
 */
export const createUser = (user) => {
  const User = mongoose.model('users', UserSchema)
  const newUser = new User(user)
  return newUser.save() // promise
}
/** set refresh token to provided userID
 *@param userId {string} mongoDB userID
 *@param token {string} refresh token to be set
 *@return {Promise} mongoDB .findByIdAndUpdate promise
 */
export const setRefreshToken = (userId, token) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate({ userId }, { refreshToken: token }) // promise
}
/** set refresh token = '' to provided userID
 *@param userId {string} mongoDB userID
 *@return {Promise} mongoDB .findByIdAndUpdate promise
 */
export const clearRefreshToken = (userId) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate({ userId }, { refreshToken: '' }) // promise
}
