import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true
    },
    date_of_birth: {
      type: Date
    },
    password: {
      type: String,
      required: true
    },
    email_verify_token: {
      type: String,
      default: ''
    },
    forgot_password_token: { type: String, default: '' },
    verify: { type: String, enum: ['unverified', 'vertifed', 'banned'], default: 'unverified' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    username: { type: String, default: '' },
    avatar: { type: String, default: '' },
    cover_photo: { type: String, default: '' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

const User = model('User', userSchema)
export default User
