import { ExerciseModel } from '../models/exercises/exercise'

export interface LoadExercises {
  load: () => Promise<ExerciseModel[]>
}
