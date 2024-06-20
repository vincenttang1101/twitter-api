import { HttpStatusCode } from '@/utils/constants/http'
import { EntityError, ErrorWithStatus } from '@/utils/helpers/errors'
import express from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  const entityError = new EntityError({ error: {} })
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorsObj = errors.mapped()
      for (const key in errorsObj) {
        const { msg } = errorsObj[key]
        // Trả về lỗi không phải validation
        if (errorsObj[key].msg instanceof ErrorWithStatus && msg.status !== HttpStatusCode.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }

        entityError.errors[key] = errorsObj[key]
      }
      return next(entityError)
    }

    next()
  }
}
