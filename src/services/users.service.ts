import { DatabaseServices } from '@/services/database.service'
import { RegisterReqBody } from '@/types/users.type'
import { TokenType } from '@/utils/constants/token'
import { signToken } from '@/utils/helpers/jwt'

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

  async register(payload: RegisterReqBody) {
    const user = await this.users.create({
      ...payload
    })
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    console.log(access_token, refresh_token)
    return { data: user.toObject(), access_token, refresh_token }
  }

  async checkEmailExists(email: string) {
    const user = await this.users.findOne({ email })
    return Boolean(user)
  }
}

const usersService = new UsersService()

export default usersService
