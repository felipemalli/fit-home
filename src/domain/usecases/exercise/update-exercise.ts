import { ExerciseModel } from '@/domain/models/exercises/exercise'

export interface UpdateExerciseBodyModel extends Partial<Omit<ExerciseModel, 'id' | 'accountId' | 'variations'>> {}
export interface UpdateExerciseParamsModel {
  exerciseId: string
}

export type UpdateExerciseModel = UpdateExerciseBodyModel
export interface UpdateExercise {
  update: (id: string, data: UpdateExerciseModel) => Promise<ExerciseModel>
}
