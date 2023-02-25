import * as bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {
  BCRYPT_SALT,
  MONGO_CA_PATH, MONGO_CLIENT_CRT_PATH,
} from '../helpers/constants.js'
import UserSchema from './models/UserSchema.js'
import GameSchema from './models/GameSchema.js'
import {
  setMatchedCards, openCard, closeCards, resetCards,
} from '../helpers/gameLogic/gameLogicFunctions.js'

/** Function to generate mongoDB connection URL
 *@param host {string} IP address or DNS hostname
 *@param port {string} mongoDB port
 *@return {string} mongodb URL: mongodb://host:port
 */
export const genConnectionString = (host, port) => {
  if (!MONGO_CA_PATH) throw Error('No mongo CA Path in environment')
  if (!MONGO_CLIENT_CRT_PATH) throw Error('No mongo client crt Path in environment')

  return `mongodb://${host}:${port}/memo-game`
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
export const dbCreateUser = async (user) => {
  const User = mongoose.model('users', UserSchema)
  const cryptPassword = await bcrypt.hash(user.password, +BCRYPT_SALT)
  const newUser = new User({ email: user.email, password: cryptPassword, userName: user.userName })
  return newUser.save() // promise
}
/** function to check email and crypt password
 * provided in user object with DB
 * @param user user object required fields - email, password
 * @return {Promise<string>} successfull login
 */
export const dbLoginUser = async (user) => {
  const User = mongoose.model('users', UserSchema)
  const dbUser = await User.findOne({ email: user.email })
  if (dbUser) {
    const isPasswordValid = await bcrypt.compare(user.password, dbUser.password)
    if (isPasswordValid) {
      return dbUser._id.toString()
    }
    return ''
  }
  return ''
}
/** set refresh token to provided userID
 *@param userId {string} mongoDB userID
 *@param token {string} refresh token to be set
 *@return {Promise} mongoDB .findByIdAndUpdate promise
 */
export const dbSetRefreshToken = (userId, token) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate(userId, { refreshToken: token }) // promise
}
/** set refresh token = '' to provided userID
 *@param userId {string} mongoDB userID
 *@return {Promise} mongoDB .findByIdAndUpdate promise
 */
export const dbClearRefreshToken = (userId) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate(userId, { refreshToken: '' }) // promise
}
/** Find user with provided userID
 *@param userId {string} mongoDB userID
 *@return {Promise} mongoDB .findById promise
 */
export const dbGetUser = (userId) => {
  const User = mongoose.model('users', UserSchema)
  return User.findById(userId)
}

export const dbCreateGame = (userId, cards) => {
  const Game = mongoose.model('games', GameSchema)
  const newGame = Game({ userId, cards })
  return newGame.save()
}

export const dbGetGameCards = (userId, gameId) => {
  const Game = mongoose.model('games', GameSchema)
  return Game.findOne({ _id: gameId, userId })
}

export const dbOpenCard = async (userId, gameId, cardId) => {
  const game = await dbGetGameCards(userId, gameId)
  const newCards = openCard(game.cards, cardId)
  const Game = mongoose.model('games', GameSchema)
  return Game.findOneAndUpdate({ _id: gameId, userId }, { cards: newCards }, { new: true })
}

export const dbCloseCards = async (userId, gameId, cardIds) => {
  const game = await dbGetGameCards(userId, gameId)
  const newCards = closeCards(game.cards, cardIds)
  const Game = mongoose.model('games', GameSchema)
  return Game.findOneAndUpdate({ _id: gameId, userId }, { cards: newCards }, { new: true })
}

export const dbSetMatched = async (userId, gameId, cardIds) => {
  const game = await dbGetGameCards(userId, gameId)
  const newCards = setMatchedCards(game.cards, cardIds)
  const Game = mongoose.model('games', GameSchema)
  return Game.findOneAndUpdate({ _id: gameId, userId }, { cards: newCards }, { new: true })
}

export const dbResetGame = async (userId, gameId) => {
  const game = await dbGetGameCards(userId, gameId)
  const newCards = resetCards(game.cards)
  const Game = mongoose.model('games', GameSchema)
  return Game.findOneAndUpdate({ _id: gameId, userId }, { cards: newCards }, { new: true })
}

export const dbChangeUserPassword = async (userId, newPassword) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate(userId, { password: newPassword }, { new: true })
}

export const dbSetUserAvatar = async (userId, avatarUrl) => {
  const User = mongoose.model('users', UserSchema)
  return User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true })
}

export const dbGetUserGames = async (userId) => {
  const Game = mongoose.model('games', GameSchema)
  return Game.find({ userId }).select({ cards: 0 })
}
