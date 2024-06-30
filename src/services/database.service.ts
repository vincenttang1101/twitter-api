import mongoose from 'mongoose'
import 'dotenv/config'
import dotenv from 'dotenv'
import User from '@/models/schemas/user.schema'
import RefreshToken from '@/models/schemas/refresh-token.schema'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

export class DatabaseServices {
  async connect() {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.oulcqfv.mongodb.net/${process.env.DB_NAME}`
      )
      console.log('Connected to database!')
    } catch (error) {
      console.log('Error connecting to database:', error)
      throw error
    }
  }

  get users() {
    return User
  }

  get refreshTokens() {
    return RefreshToken
  }
}

const databaseServices = new DatabaseServices()

export default databaseServices
