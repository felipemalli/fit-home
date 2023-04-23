import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddExerciseController } from '@/main/factories/controllers/exercise/add-exercise/add-exercise-controller-factory'
import { makeLoadExercisesController } from '@/main/factories/controllers/exercise/load-exercises/load-exercises-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/exercises', auth, adaptRoute(makeAddExerciseController()))
  router.get('/exercises', auth, adaptRoute(makeLoadExercisesController()))
}
