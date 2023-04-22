import { ExerciseModel } from '../models/exercises/exercise'
import { ExerciseConfiguration } from '../models/exercises/shared/exercise-variation'

export interface AddExerciseModel extends ExerciseConfiguration {
  workoutId?: string
  templateId?: string
  name: string
  description?: string
  variationName: string
  variationDescription?: string
  variationUrl?: string
}

type AddExerciseModelRequest = AddExerciseModel & { accountId: string }

export interface AddExercise {
  add: (exercise: AddExerciseModelRequest) => Promise<ExerciseModel>
}
