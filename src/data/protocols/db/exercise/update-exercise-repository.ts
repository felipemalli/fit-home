import { UpdateExerciseData } from '@/domain/usecases/exercise/update-exercise'
import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseRepository {
  update: (id: string, data: UpdateExerciseData) => Promise<ExerciseModel>
}
