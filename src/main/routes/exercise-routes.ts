import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddExerciseController } from '../factories/controllers/exercise/add-exercise/add-exercise-controller-factory'
import { makeLoadExercisesController } from '../factories/controllers/exercise/load-exercises/load-exercises-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const userAuth = adaptMiddleware(makeAuthMiddleware())
  router.post('/exercises', userAuth, adaptRoute(makeAddExerciseController()))
  router.get('/exercises', userAuth, adaptRoute(makeLoadExercisesController()))
}
