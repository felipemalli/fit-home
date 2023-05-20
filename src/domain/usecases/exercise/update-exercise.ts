import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseBody extends Partial<Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>> {}
export interface UpdateExerciseParams {
  exerciseId: string
}

export type UpdateExerciseData = UpdateExerciseBody
export interface UpdateExercise {
  update: (id: string, data: UpdateExerciseData) => Promise<ExerciseModel>
}
