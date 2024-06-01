import usersService from '@/services/users.service'
import { RegisterReqBody } from '@/types/users.type'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export class UsersController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (email === 'a' && password === 'b') {
      return res.json({
        succes: true
      })
    }

    return res.status(400).json({
      succes: false
    })
  }

  async register(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) {
    try {
      const { email, password, confirm_password, name, date_of_birth } = req.body
      usersService.register({
        email,
        password,
        confirm_password,
        name,
        date_of_birth
      })

      return res.status(200).json({
        success: true
      })
    } catch (error) {
      return res.status(400).json({
        success: false
      })
    }
  }
}

const usersController = new UsersController()
export default usersController
