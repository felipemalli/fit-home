import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { UpdateExercise } from '@/domain/usecases/exercise/update-exercise'

export interface UpdateExerciseRepository {
  update: (id: string, data: UpdateExerciseRepository.Params) => Promise<UpdateExerciseRepository.Result>
}

export namespace UpdateExerciseRepository {
  export type Params = UpdateExercise.Params

  export type Result = ExerciseModel
}
