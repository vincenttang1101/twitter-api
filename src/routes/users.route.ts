import usersController from '@/controllers/users.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '@/middlewares/users.middleware'
import { UserMessage } from '@/utils/constants/message'
import { wrapRequestHandler } from '@/utils/helpers/handlers'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, wrapRequestHandler(usersController.register))
usersRouter.post('/login', loginValidator, wrapRequestHandler(usersController.login))
usersRouter.post(
  '/logout',
  accessTokenValidator,
  refreshTokenValidator,
  wrapRequestHandler((req, res) => {
    res.json({
      message: UserMessage.LOGOUT_SUCCESSFULLY
    })
  })
)

export default usersRouter
