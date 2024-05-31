import express from 'express'
import { ContextRunner } from 'express-validator'

// can be reused by many routes
export const validate = (validations: ContextRunner[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = []

    for (const validation of validations) {
      const result = await validation.run(req)
      if (!result.isEmpty()) {
        errors.push(...Object.values(result.mapped()))
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }

    next()
  }
}
