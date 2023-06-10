import { makeLogControllerDecorator } from '#/main/factories/decorators/log-controller-decorator-factory'
import { makeDbUpdateExercise } from '#/main/factories/usecases/exercise/update-exercise/db-update-exercise-factory'
import { makeDbCheckExerciseById } from '#/main/factories/usecases/exercise/check-exercise-by-id/db-load-exercise-by-id-factory'
import { Controller } from '#/presentation/protocols'
import { UpdateExerciseController } from '#/presentation/controllers/exercise/update-exercise/update-exercise-controller'

export const makeUpdateExerciseController = (): Controller => {
  const controller = new UpdateExerciseController(makeDbCheckExerciseById(), makeDbUpdateExercise())
  return makeLogControllerDecorator(controller)
}
