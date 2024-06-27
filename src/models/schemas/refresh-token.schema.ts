import { Document, Schema, Types, model } from 'mongoose'

export interface RefreshTokenDocument extends Document {
  user_id: Types.ObjectId
  token: string
  created_at: Date
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at'
    }
  }
)

const RefreshToken = model<RefreshTokenDocument>('refresh_token', refreshTokenSchema)

export default RefreshToken
