import { HttpStatusCode } from '@/utils/constants/http'
import { ErrorWithStatus } from '@/utils/helpers/error'
import express from 'express'
import { ContextRunner, validationResult } from 'express-validator'

// can be reused by many routes
export const validate = (validations: ContextRunner[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req)

      if (!result.isEmpty()) {
        result.array().map(({ msg }) => {
          if (msg instanceof ErrorWithStatus && msg.status !== HttpStatusCode.UNPROCESSABLE_ENTITY) {
            return next(msg)
          }
        })
      }
    }

    next()
  }
}
