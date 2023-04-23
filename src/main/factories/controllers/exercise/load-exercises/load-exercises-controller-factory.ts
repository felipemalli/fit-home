import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadExercises } from '@/main/factories/usecases/exercise/load-exercises/db-load-exercises'
import { Controller } from '@/presentation/protocols'
import { LoadExercisesController } from '@/presentation/controllers/exercise/load-exercises/load-exercises-controller'

export const makeLoadExercisesController = (): Controller => {
  const controller = new LoadExercisesController(makeDbLoadExercises())
  return makeLogControllerDecorator(controller)
}
