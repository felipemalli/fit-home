import { Middleware } from '@/presentation/protocols'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    void middleware.handle(request).then((httpResponse) => {
      if (httpResponse.statusCode === 200) {
        Object.assign(req, httpResponse.body)
        next()
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    })
  }
}
