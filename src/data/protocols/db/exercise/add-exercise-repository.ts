import { ExerciseModel } from '../../../../domain/models/exercise'
import { AddExerciseModel } from '../../../../domain/usecases/add-exercise'

export interface AddExerciseRepository {
  add: (exerciseData: AddExerciseModel) => Promise<ExerciseModel>
}
