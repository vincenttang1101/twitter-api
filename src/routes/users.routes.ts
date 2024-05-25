import { loginController, registerController } from '@/controllers/users.controllers'
import { loginValidator } from '@/middlewares/users.middlewares'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', (req, res) => {
  res.send('Hello World!')
})

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerController)
export default usersRouter
