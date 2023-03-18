import { Express } from 'express'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'
import { json } from '../middlewares/json'

export default (app: Express): void => {
  app.use(json)
  app.use(cors)
  app.use(contentType)
}
