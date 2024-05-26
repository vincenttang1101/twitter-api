import { DatabaseServices } from '@/services/database.service'

class UsersServices extends DatabaseServices {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload

    const result = this.users.create({
      email,
      password
    })

    return result
  }
}

const usersServices = new UsersServices()

export default usersServices
