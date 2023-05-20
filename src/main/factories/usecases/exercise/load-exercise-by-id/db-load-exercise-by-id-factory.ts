import { LoadExerciseById } from '@/domain/usecases/exercise/load-exercise-by-id'
import { DbLoadExerciseById } from '@/data/usecases/exercise/load-exercise-by-id/db-load-exercise-by-id'
import { ExerciseMongoRepository } from '@/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbLoadExerciseById = (): LoadExerciseById => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbLoadExerciseById(exerciseMongoRepository)
}
