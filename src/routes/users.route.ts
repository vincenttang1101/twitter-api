import usersController from '@/controllers/users.controller'
import { loginValidator } from '@/middlewares/users.middleware'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.send('Hello World!')
})

usersRouter.post('/login', loginValidator, usersController.login)
usersRouter.post('/register', usersController.register)

export default usersRouter
