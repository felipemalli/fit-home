import { ExerciseModel, ExerciseConfiguration } from '@/domain/models/exercises/exercise'

export interface AddExerciseBodyModel extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>, ExerciseConfiguration {
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

export type AddExerciseModel = AddExerciseBodyModel & { accountId: string }

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
