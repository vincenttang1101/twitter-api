import { UserDocument } from '@/models/schemas/user.schema'
import { DatabaseServices } from '@/services/database.service'
import { RegisterReqBody } from '@/types/users.type'
import { TokenType } from '@/utils/constants/token'
import { signToken } from '@/utils/helpers/jwt'
import { FilterQuery, Types } from 'mongoose'

class UsersService extends DatabaseServices {
  private async signAccessToken(user_id: string) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.ACCESS_TOKEN
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
      }
    })
  }

  private async signRefreshToken(user_id: string) {
    return await signToken({
      payload: {
        user_id,
        token_type: TokenType.REFRESH_TOKEN
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
      }
    })
  }

  private async signAccessAndRefreshToken(user_id: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return [access_token, refresh_token]
  }

  async register(payload: RegisterReqBody) {
    const user = await this.users.create({
      ...payload
    })
    const user_id = String(user._id)
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    await this.refreshTokens.create({
      user_id,
      token: refresh_token
    })
    return { ...user.toObject(), access_token, refresh_token }
  }

  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    await this.refreshTokens.create({
      user_id,
      token: refresh_token
    })

    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExists(email: string) {
    const user = await this.users.findOne({ email })
    return Boolean(user)
  }

  findOneBy(filter: FilterQuery<UserDocument>) {
    return this.users.findOne(filter)
  }
}

const usersService = new UsersService()

export default usersService
