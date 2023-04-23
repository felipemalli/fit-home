import { ExerciseModel } from '@/data/usecases/add-exercise/db-add-exercise-protocols'

export interface LoadExercisesRepository {
  loadAll: (accountId: string) => Promise<ExerciseModel[]>
}
