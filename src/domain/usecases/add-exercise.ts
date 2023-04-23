import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { ExerciseConfiguration } from '@/domain/models/exercises/shared/exercise-variation'

export interface AddExerciseBodyModel extends ExerciseConfiguration {
  workoutId?: string
  templateId?: string
  name: string
  description?: string
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

export type AddExerciseModel = AddExerciseBodyModel & { accountId: string }

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
