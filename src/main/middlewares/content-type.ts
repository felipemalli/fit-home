import { RequestHandler } from 'express'

export const contentType: RequestHandler = (req, res, next): void => {
  res.type('json')
  next()
}
