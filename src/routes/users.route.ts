import usersController from '@/controllers/users.controller'
import { loginValidator, registerValidator } from '@/middlewares/users.middleware'
import { wrapRequestHandler } from '@/utils/helpers/handler'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, wrapRequestHandler(usersController.login))

usersRouter.post('/register', registerValidator, wrapRequestHandler(usersController.register))

export default usersRouter
