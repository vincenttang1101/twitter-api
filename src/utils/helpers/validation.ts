import { HttpStatusCode } from '@/utils/constants/http'
import { EntityError, ErrorWithStatus } from '@/utils/helpers/error'
import express from 'express'
import { ContextRunner, validationResult } from 'express-validator'

// can be reused by many routes
export const validate = (validations: ContextRunner[]) => {
  const entityError = new EntityError({ error: {} })
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      if (!result.isEmpty()) {
        const errorsObj = result.mapped()
        for (const key in errorsObj) {
          const { msg } = errorsObj[key]
          // Trả về lỗi không phải validation
          if (errorsObj[key].msg instanceof ErrorWithStatus && msg.status !== HttpStatusCode.UNPROCESSABLE_ENTITY) {
            return next(msg)
          }

          console.log(errorsObj)
          entityError.errors[key] = errorsObj[key]
          return next(entityError)
        }
      }
    }

    next()
  }
}
