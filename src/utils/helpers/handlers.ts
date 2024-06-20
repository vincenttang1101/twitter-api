import { NextFunction, Request, RequestHandler, Response } from 'express'

export const wrapRequestHandler = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
