import usersController from '@/controllers/users.controller'
import { loginValidator, registerValidator } from '@/middlewares/users.middleware'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, usersController.login)
/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, usersController.register)

export default usersRouter
