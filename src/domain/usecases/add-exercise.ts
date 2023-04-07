import { ExerciseModel } from '../models/exercise'

export interface AddExerciseModel {
  name: string
  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
}

export interface AddExercise {
  add: (exercise: AddExerciseModel) => Promise<ExerciseModel>
}
