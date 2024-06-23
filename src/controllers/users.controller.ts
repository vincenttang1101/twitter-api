import usersService from '@/services/users.service'
import { RegisterReqBody } from '@/types/users.type'
import { HttpStatusCode } from '@/utils/constants/http'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export class UsersController {
  async register(req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) {
    const user = await usersService.register(req.body)

    return res.status(HttpStatusCode.OK).json({
      data: user,
      success: true
    })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { user } = req
    const user_id = user?._id
    const result = await usersService.login(String(user_id))

    return res.status(HttpStatusCode.OK).json({
      message: 'Login successful',
      result
    })
  }
}

const usersController = new UsersController()
export default usersController
