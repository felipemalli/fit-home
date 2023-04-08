import { AddExerciseController } from '../../../../presentation/controllers/exercise/add-exercise/add-exercise-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddExercise } from '../../usecases/add-exercise/db-add-exercise-factory'
import { makeAddExerciseValidation } from './add-exercise-validation-factory'

export const makeAddExerciseController = (): Controller => {
  const controller = new AddExerciseController(makeAddExerciseValidation(), makeDbAddExercise())
  return makeLogControllerDecorator(controller)
}
