import { ExerciseModel } from '../models/exercises/exercise'

export interface LoadExercises {
  load: (accountId: string) => Promise<ExerciseModel[]>
}
