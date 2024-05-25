import { DatabaseService } from '@/services/database.services'

class UsersService extends DatabaseService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload

    const result = this.users.create({
      email,
      password
    })

    return result
  }
}

const usersService = new UsersService()

export default usersService
