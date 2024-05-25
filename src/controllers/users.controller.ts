import databaseService from '@/services/database.services'
import usersService from '@/services/users.service'
import { NextFunction, Request, Response } from 'express'

export const loginController = (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body

  if (email === 'a' && password === 'b') {
    return response.json({
      succes: true
    })
  }

  return response.status(400).json({
    succes: false
  })
}

export const registerController = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body

  try {
    usersService.register({
      email,
      password
    })

    return response.status(200).json({
      success: true
    })
  } catch (error) {
    return response.status(400).json({
      success: false
    })
  }
}
