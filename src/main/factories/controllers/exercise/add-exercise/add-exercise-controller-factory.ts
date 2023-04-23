import { makeAddExerciseValidation } from './add-exercise-validation-factory'
import { makeDbAddExercise } from '@/main/factories/usecases/exercise/add-exercise/db-add-exercise-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { AddExerciseController } from '@/presentation/controllers/exercise/add-exercise/add-exercise-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddExerciseController = (): Controller => {
  const controller = new AddExerciseController(makeAddExerciseValidation(), makeDbAddExercise())
  return makeLogControllerDecorator(controller)
}
