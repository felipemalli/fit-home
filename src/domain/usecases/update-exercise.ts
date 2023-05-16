import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseModel extends Partial<Omit<ExerciseModel, 'id' | 'accountId' | 'isTemplate' | 'variations'>> {}

export interface UpdateExercise {
  update: (exercise: UpdateExerciseModel) => Promise<ExerciseModel>
}
