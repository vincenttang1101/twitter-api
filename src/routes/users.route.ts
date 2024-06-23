import usersController from '@/controllers/users.controller'
import { loginValidator, registerValidator } from '@/middlewares/users.middleware'
import { wrapRequestHandler } from '@/utils/helpers/handlers'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, wrapRequestHandler(usersController.register))
usersRouter.post('/login', loginValidator, wrapRequestHandler(usersController.login))

export default usersRouter
