import { ExerciseModel } from '../models/exercises/exercise'

export interface AddExerciseModel {
  name: string
  description?: string
  url?: string
  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
  workoutId?: string
}

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
