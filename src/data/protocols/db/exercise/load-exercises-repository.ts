import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface LoadExercisesRepository {
  loadAll: (accountId: string) => Promise<ExerciseModel[]>
}
