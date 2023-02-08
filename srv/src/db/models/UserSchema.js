import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: '' },
})

export default UserSchema
