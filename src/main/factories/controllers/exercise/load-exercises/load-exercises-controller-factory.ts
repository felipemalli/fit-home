import { LoadExercisesController } from '../../../../../presentation/controllers/exercise/load-exercises/load-exercises-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadExercises } from '../../../usecases/exercise/load-exercises/db-load-exercises'

export const makeLoadExercisesController = (): Controller => {
  const controller = new LoadExercisesController(makeDbLoadExercises())
  return makeLogControllerDecorator(controller)
}
