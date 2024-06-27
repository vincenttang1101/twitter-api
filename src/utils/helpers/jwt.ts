import { errorMonitor } from 'events'
import jwt from 'jsonwebtoken'

type SignTokenArguments = {
  payload: string | Buffer | object
  secretOrPrivateKey?: string
  options?: jwt.SignOptions
}

type VerifyTokenAgruments = {
  token: string
  secretOrPublicKey?: string
}

export const signToken = ({
  payload,
  secretOrPrivateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: SignTokenArguments) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublicKey = process.env.JWT_SECRET as string }: VerifyTokenAgruments) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
