import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, unique: true },
  refreshToken: { type: String, default: '' },
})

export default UserSchema
