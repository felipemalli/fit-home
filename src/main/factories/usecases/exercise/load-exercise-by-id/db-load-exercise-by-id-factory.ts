import { CheckExerciseById } from '@/domain/usecases/exercise/load-exercise-by-id'
import { DbCheckExerciseById } from '@/data/usecases/exercise/load-exercise-by-id/db-load-exercise-by-id'
import { ExerciseMongoRepository } from '@/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbLoadExerciseById = (): CheckExerciseById => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbCheckExerciseById(exerciseMongoRepository)
}
