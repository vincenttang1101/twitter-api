import { UserVerifyStatus } from '@/utils/constants/user'
import { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  name: string
  email: string
  date_of_birth?: Date
  password: string
  email_verify_token?: string
  forgot_password_token?: string
  verify: UserVerifyStatus
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
  created_at?: Date
  updated_at?: Date
}

const userSchema = new Schema<UserDocument>(
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
      required: true,
      select: false
    },
    email_verify_token: {
      type: String,
      default: ''
    },
    forgot_password_token: { type: String, default: '' },
    verify: { type: Number, enum: UserVerifyStatus, default: UserVerifyStatus.UNVERIFIED },
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
    },
    toObject: {
      useProjection: true
    }
  }
)

userSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, Number(process!.env!.SALT_ROUNDS))
    this.password = hashedPassword
  }
  next()
})

userSchema.methods.comparePassword = async function (plainPassword: string) {
  return await bcrypt.compare(plainPassword, this.password)
}

const User = model<UserDocument>('User', userSchema)

export default User
