import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { ExerciseCommon } from '../models/exercises/shared/exercise-common'

export interface UpdateExerciseModel extends Partial<Omit<ExerciseCommon, 'variations' | 'accountId'>> {}

export interface UpdateExercise {
  update: (exercise: UpdateExerciseModel) => Promise<ExerciseModel>
}
