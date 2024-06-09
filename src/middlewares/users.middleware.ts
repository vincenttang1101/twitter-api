import usersServices from '@/services/users.service'
import { HttpStatusCode } from '@/utils/constants/http'
import { ErrorWithStatus } from '@/utils/helpers/error'
import { validate } from '@/utils/helpers/validation'
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isEmailExists = await usersServices.checkEmailExists(value)
          if (isEmailExists) {
            throw new ErrorWithStatus({ message: 'Email already exists', status: HttpStatusCode.BAD_REQUEST })
          }
          return isEmailExists
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      error: 'Missing email or password'
    })
  }

  next()
}
