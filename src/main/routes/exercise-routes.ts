import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddExerciseController } from '@/main/factories/controllers/exercise/add-exercise/add-exercise-controller-factory'
import { makeLoadExercisesController } from '@/main/factories/controllers/exercise/load-exercises/load-exercises-controller-factory'
import { makeUpdateExerciseController } from '@/main/factories/controllers/exercise/update-exercise/update-exercise-controller-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/exercises', auth, adaptRoute(makeAddExerciseController()))
  router.get('/exercises', auth, adaptRoute(makeLoadExercisesController()))
  router.put('/exercises/:exerciseId', auth, adaptRoute(makeUpdateExerciseController()))
}
