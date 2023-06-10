import { CheckExerciseById } from '#/domain/usecases/exercise/check-exercise-by-id'
import { DbCheckExerciseById } from '#/data/usecases/exercise/check-exercise-by-id/db-check-exercise-by-id'
import { ExerciseMongoRepository } from '#/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbCheckExerciseById = (): CheckExerciseById => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbCheckExerciseById(exerciseMongoRepository)
}
