import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface LoadExercises {
  load: (accountId: string) => Promise<LoadExercises.Result>
}

export namespace LoadExercises {
  export type Result = ExerciseModel[]
}
