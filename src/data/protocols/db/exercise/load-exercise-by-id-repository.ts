import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface LoadExerciseByIdRepository {
  loadById: (id: string) => Promise<ExerciseModel>
}
