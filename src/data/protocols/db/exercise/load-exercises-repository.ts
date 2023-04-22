import { ExerciseModel } from '../../../usecases/add-exercise/db-add-exercise-protocols'

export interface LoadExercisesRepository {
  loadAll: (accountId: string) => Promise<ExerciseModel[]>
}
