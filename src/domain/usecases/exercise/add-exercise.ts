import { ExerciseModel, ExerciseConfiguration } from '@/domain/models/exercises/exercise'

export interface AddExercise {
  add: (exercise: AddExercise.Params) => Promise<AddExercise.Result>
}
export namespace AddExercise {
  export interface Params extends Omit<ExerciseModel, 'id' | 'variations'>, ExerciseConfiguration {
    variationName: string
    variationDescription?: string
    variationUrl?: string
  }

  export type Result = ExerciseModel
}
