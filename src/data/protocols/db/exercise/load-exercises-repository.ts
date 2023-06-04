import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface LoadExercisesRepository {
  loadAll: (accountId: string) => Promise<LoadExercisesRepository.Result>
}

export namespace LoadExercisesRepository {
  export type Result = ExerciseModel[]
}
