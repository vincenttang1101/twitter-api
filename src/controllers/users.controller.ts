import usersService from '@/services/users.service'
import { RegisterReqBody } from '@/types/users.type'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export class UsersController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (email === 'a' && password === 'b') {
      return res.json({
        success: true
      })
    }

    return res.status(400).json({
      success: false
    })
  }

  async register(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) {
    const user = await usersService.register(req.body)

    return res.status(200).json({
      data: user,
      success: true
    })
  }
}

const usersController = new UsersController()
export default usersController
