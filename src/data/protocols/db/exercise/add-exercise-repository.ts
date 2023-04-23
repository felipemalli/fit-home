import { AddExerciseModel } from '@/domain/usecases/add-exercise'
import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface AddExerciseRepository {
  add: (exerciseData: AddExerciseModel) => Promise<ExerciseModel>
}
