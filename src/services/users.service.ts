import { DatabaseServices } from '@/services/database.service'

class UsersService extends DatabaseServices {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload

    const result = this.users.create({
      email,
      password
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
