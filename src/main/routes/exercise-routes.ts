import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddExerciseController } from '../factories/controllers/exercise/add-exercise/add-exercise-controller-factory'

export default (router: Router): void => {
  // const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/exercises', adaptRoute(makeAddExerciseController()))
}
