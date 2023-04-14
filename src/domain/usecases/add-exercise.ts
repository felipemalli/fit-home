import { ExerciseModel } from '../models/exercises/exercise'

export interface AddExerciseModel {
  name: string
  description?: string
  url?: string
  accountId: string
  workoutId?: string
  configuration: {
    series: number
    betweenSeriesTime: number
    repetitions: number
    repetitionTime: number
  }
}

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
