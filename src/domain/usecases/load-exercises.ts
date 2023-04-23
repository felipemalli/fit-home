import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface LoadExercises {
  load: (accountId: string) => Promise<ExerciseModel[]>
}
