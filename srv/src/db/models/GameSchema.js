import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  state: { type: String, default: 'In progress' },
  type: { type: String, required: true },
  openedCards: { type: [Object], default: [], required: true },
  cards: { type: [Object], required: true },
  userId: { type: String, required: true },
})

export default GameSchema
/*
card Object {
id - random,
picture - card opened picture url
isOpen - boolean
isMatched - boolean
}
 */
