import { ExerciseModel, ExerciseConfiguration } from '@/domain/models/exercises/exercise'

export interface AddExerciseBody extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>, ExerciseConfiguration {
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

export type AddExerciseData = AddExerciseBody & { accountId: string }

export interface AddExercise {
  add: (exercise: AddExerciseData) => Promise<ExerciseModel>
}
