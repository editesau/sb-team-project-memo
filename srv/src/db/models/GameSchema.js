import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  state: { type: String, default: 'In progress' },
  cards: { type: [Object], default: [] },
  userId: { type: String },
})

export default GameSchema
/*
card Object {
id - random,
picture - card opened picture url
isOpen - boolean
isMathced - boolean
}
 */
