import { Request, RequestHandler, Response } from 'express'
import { Controller, HttpRequest } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    void controller.handle(httpRequest).then((httpResponse) => {
      const stringStatus = httpResponse.statusCode.toString()
      if (stringStatus.startsWith('4') || stringStatus.startsWith('5')) {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    })
  }
}
