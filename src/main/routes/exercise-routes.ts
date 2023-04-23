import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddExerciseController } from '../factories/controllers/exercise/add-exercise/add-exercise-controller-factory'
import { makeLoadExercisesController } from '../factories/controllers/exercise/load-exercises/load-exercises-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/exercises', auth, adaptRoute(makeAddExerciseController()))
  router.get('/exercises', auth, adaptRoute(makeLoadExercisesController()))
}
