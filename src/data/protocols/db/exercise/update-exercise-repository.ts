import { UpdateExerciseModel } from '@/domain/usecases/exercise/update-exercise'
import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseRepository {
  update: (id: string, data: UpdateExerciseModel) => Promise<ExerciseModel>
}
