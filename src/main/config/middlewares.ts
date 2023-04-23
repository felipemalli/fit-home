import { contentType, cors, json } from '../middlewares'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(json)
  app.use(cors)
  app.use(contentType)
}
