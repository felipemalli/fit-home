import { ExerciseModel } from '#/domain/models/exercises/exercise'

export interface UpdateExercise {
  update: (id: string, data: UpdateExercise.Params) => Promise<UpdateExercise.Result>
}

export namespace UpdateExercise {
  export type Params = Partial<Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>>

  export type Result = ExerciseModel
}
