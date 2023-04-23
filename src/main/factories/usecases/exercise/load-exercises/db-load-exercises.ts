import { DbLoadExercises } from '../../../../../data/usecases/load-exercises/db-load-exercises'
import { LoadExercises } from '../../../../../domain/usecases/load-exercises'
import { ExerciseMongoRepository } from '../../../../../infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbLoadExercises = (): LoadExercises => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbLoadExercises(exerciseMongoRepository)
}
