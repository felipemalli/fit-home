import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseRequestBody extends Partial<Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>> {}
export interface UpdateExerciseRequestParams {
  exerciseId: string
}

export type UpdateExerciseParams = UpdateExerciseRequestBody
export interface UpdateExercise {
  update: (id: string, data: UpdateExerciseParams) => Promise<ExerciseModel>
}
