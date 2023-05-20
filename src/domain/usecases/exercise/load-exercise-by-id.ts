import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface LoadExerciseById {
  loadById: (id: string) => Promise<ExerciseModel | null>
}
