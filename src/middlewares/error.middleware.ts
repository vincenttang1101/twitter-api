import { HttpStatusCode } from '@/utils/constants/http'
import express from 'express'
import { omit } from 'lodash'

export const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
