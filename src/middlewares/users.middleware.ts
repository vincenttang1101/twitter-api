import usersServices from '@/services/users.service'
import { HttpStatusCode } from '@/utils/constants/http'
import { UserMessage } from '@/utils/constants/message'
import { ErrorWithStatus } from '@/utils/helpers/errors'
import { validate } from '@/utils/helpers/validations'
import { checkSchema } from 'express-validator'
import bcrypt from 'bcrypt'

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: UserMessage.NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: UserMessage.NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: UserMessage.NAME_LENGTH_MUST_BE_FROM_1_TO_100
      },
      trim: true
    },
    email: {
      notEmpty: {
        errorMessage: UserMessage.EMAIL_IS_REQUIRED
      },
      isEmail: {
        errorMessage: UserMessage.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value) => {
          const isEmailExists = await usersServices.checkEmailExists(value)
          if (isEmailExists) {
            throw new ErrorWithStatus({
              message: UserMessage.EMAIL_ALREADY_EXISTS,
              status: HttpStatusCode.UNPROCESSABLE_ENTITY
            })
          }
          return isEmailExists
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: UserMessage.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: UserMessage.PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: UserMessage.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: UserMessage.PASSWORD_MUST_BE_STRONG
      }
    },
    confirm_password: {
      // custom: {
      //   options: (value, { req }) => {
      //     if (value !== req.body.password) {
      //       throw new Error(UserMessage.CONFIRM_PASSWORD_MUST_BE_THE_SAME_PASSWORD)
      //     }
      //   }
      // }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: UserMessage.DATE_OF_BIRTH_MUST_BE_ISO8601
      }
    }
  })
)

export const loginValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: UserMessage.EMAIL_IS_REQUIRED
      },
      isEmail: {
        errorMessage: UserMessage.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await usersServices.findOneBy({ email: value }).select('+password')

          if (!user) {
            throw new ErrorWithStatus({
              message: UserMessage.EMAIL_DOES_NOT_EXIST,
              status: HttpStatusCode.UNPROCESSABLE_ENTITY
            })
          }

          const isPasswordMatch = await (user as any).comparePassword(req.body.password)

          if (!isPasswordMatch) {
            throw new ErrorWithStatus({
              message: UserMessage.PASSWORD_IS_INCORRECT,
              status: HttpStatusCode.UNPROCESSABLE_ENTITY
            })
          }

          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: UserMessage.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: UserMessage.PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 6,
          max: 50
        },
        errorMessage: UserMessage.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage: UserMessage.PASSWORD_MUST_BE_STRONG
      }
    }
  })
)
