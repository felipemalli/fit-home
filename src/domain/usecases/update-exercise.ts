import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseModel extends Partial<Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>> {}

export interface UpdateExercise {
  update: (data: UpdateExerciseModel) => Promise<ExerciseModel>
}
