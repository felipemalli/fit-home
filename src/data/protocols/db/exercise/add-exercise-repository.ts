import { AddExercise } from '#/domain/usecases/exercise/add-exercise'

export interface AddExerciseRepository {
  add: (exerciseData: AddExerciseRepository.Params) => Promise<void>
}

export namespace AddExerciseRepository {
  export type Params = AddExercise.Params
}
