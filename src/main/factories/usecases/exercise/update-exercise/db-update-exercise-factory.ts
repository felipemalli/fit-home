import { UpdateExercise } from '#/domain/usecases/exercise/update-exercise'
import { DbUpdateExercise } from '#/data/usecases/exercise/update-exercise/db-update-exercise'
import { ExerciseMongoRepository } from '#/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbUpdateExercise = (): UpdateExercise => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbUpdateExercise(exerciseMongoRepository)
}
