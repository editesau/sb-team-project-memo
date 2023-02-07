import mongoose from 'mongoose'
import { genConnectionOptions, genConnectionString } from './db/dbActions.js'

const startApp = async () => {
  try {
    await mongoose.connect(genConnectionString(), genConnectionOptions())
    console.log('DB connected ')
  } catch (dbError) {
    console.error(`Failed to connect to MongoDB ${dbError}`)
  }
}

startApp()
