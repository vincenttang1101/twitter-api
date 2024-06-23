import { Request } from 'express'
import { UserDocument } from '@/models/schemas/user.schema'

declare module 'express' {
  export interface Request {
    user?: UserDocument
  }
}
