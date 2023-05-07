import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { ExerciseConfiguration } from '@/domain/models/exercises/shared/exercise-variation'

export interface AddExerciseBodyModel extends Omit<ExerciseModel, 'id' | 'accountId' | 'selectedVariationId' | 'variations'>, ExerciseConfiguration {
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

export type AddExerciseModel = AddExerciseBodyModel & { accountId: string }

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
