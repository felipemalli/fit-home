import { AddExercise } from '@/domain/usecases/add-exercise'
import { DbAddExercise } from '@/data/usecases/add-exercise/db-add-exercise'
import { ExerciseMongoRepository } from '@/infra/db/mongodb/exercise/exercise-mongo-repository'

export const makeDbAddExercise = (): AddExercise => {
  const exerciseMongoRepository = new ExerciseMongoRepository()
  return new DbAddExercise(exerciseMongoRepository)
}
