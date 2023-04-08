import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddExerciseController } from '../factories/controllers/add-exercise/add-exercise-controller-factory'

export default (router: Router): void => {
  router.post('/exercises', adaptRoute(makeAddExerciseController()))
}
