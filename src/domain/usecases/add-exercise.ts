import { ExerciseModel } from '../models/exercises/exercise'
import { ExerciseConfiguration } from '../models/exercises/shared/exercise-variation'

export interface AddExerciseModel extends ExerciseConfiguration {
  workoutId?: string
  templateId?: string
  name: string
  description?: string
  accountId: string
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
