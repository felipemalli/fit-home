import { AddExerciseData } from '@/domain/usecases/exercise/add-exercise'
import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface AddExerciseRepository {
  add: (exerciseData: AddExerciseData) => Promise<ExerciseModel>
}
