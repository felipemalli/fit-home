import { AddExercise } from '@/domain/usecases/exercise/add-exercise'

export interface AddExerciseRepository {
  add: (exerciseData: AddExerciseRepository.Params) => Promise<AddExerciseRepository.Result>
}

export namespace AddExerciseRepository {
  export type Params = AddExercise.Params

  export type Result = AddExercise.Result
}
