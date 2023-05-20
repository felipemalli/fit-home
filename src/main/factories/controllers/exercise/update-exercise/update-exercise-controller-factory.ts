import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbUpdateExercise } from '@/main/factories/usecases/exercise/update-exercise/db-update-exercise-factory'
import { makeDbLoadExerciseById } from '@/main/factories/usecases/exercise/load-exercise-by-id/db-load-exercise-by-id-factory'
import { Controller } from '@/presentation/protocols'
import { UpdateExerciseController } from '@/presentation/controllers/exercise/update-exercise/update-exercise-controller'

export const makeUpdateExerciseController = (): Controller => {
  const controller = new UpdateExerciseController(makeDbLoadExerciseById(), makeDbUpdateExercise())
  return makeLogControllerDecorator(controller)
}
