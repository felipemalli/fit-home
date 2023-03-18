import { Express } from 'express'
import { cors } from '../middlewares/cors'
import { json } from '../middlewares/json'

export default (app: Express): void => {
  app.use(json)
  app.use(cors)
}
