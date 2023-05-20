import { AddExercise } from '@/domain/usecases/exercise/add-exercise'
import { DbAddExercise } from '@/data/usecases/exercise/add-exercise/db-add-exercise'
import { ExerciseMongoRepository } from '@/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbAddExercise = (): AddExercise => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbAddExercise(exerciseMongoRepository)
}
