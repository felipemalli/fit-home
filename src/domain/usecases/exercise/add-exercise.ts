import { ExerciseModel, ExerciseConfiguration } from '@/domain/models/exercises/exercise'

export interface AddExerciseRequestBody extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>, ExerciseConfiguration {
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

export type AddExerciseParams = AddExerciseRequestBody & { accountId: string }

export interface AddExercise {
  add: (exercise: AddExerciseParams) => Promise<ExerciseModel>
}
