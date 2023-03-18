import { Express } from 'express'
import { contentType, cors, json } from '../middlewares'

export default (app: Express): void => {
  app.use(json)
  app.use(cors)
  app.use(contentType)
}
