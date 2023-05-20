import { LoadExercises } from '@/domain/usecases/exercise/load-exercises'
import { DbLoadExercises } from '@/data/usecases/exercise/load-exercises/db-load-exercises'
import { ExerciseMongoRepository } from '@/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbLoadExercises = (): LoadExercises => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbLoadExercises(exerciseMongoRepository)
}
