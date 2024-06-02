import { UserVerifyStatus } from '@/utils/constants/user'
import { hash } from 'bcrypt'
import { Schema, model, set } from 'mongoose'

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

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await hash(this.password + process.env.PASSWORD_HASH_SECRET, 2)
    this.password = hashedPassword
  }
  next()
})

const User = model('User', userSchema)

export default User
