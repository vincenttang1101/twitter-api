import { DatabaseServices } from '@/services/database.service'
import { RegisterReqBody } from '@/types/users.type'
import { hash, compare } from 'bcrypt'

class UsersService extends DatabaseServices {
  async register(payload: RegisterReqBody) {
    const hashedPassword = await hash(payload.password + process.env.PASSWORD_HASH_SECRET, 2)
    const result = this.users.create({
      ...payload,
      password: hashedPassword
    })
    return result
  }

  async checkEmailExists(email: string) {
    const user = await this.users.findOne({ email })
    return Boolean(user)
  }
}

const usersService = new UsersService()

export default usersService
