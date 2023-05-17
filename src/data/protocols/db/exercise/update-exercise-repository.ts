import { UpdateExerciseModel } from '@/domain/usecases/update-exercise'
import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseRepository {
  update: (data: UpdateExerciseModel) => Promise<ExerciseModel>
}
