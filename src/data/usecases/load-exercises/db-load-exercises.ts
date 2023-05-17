import { LoadExercisesRepository, LoadExercises, ExerciseModel } from './db-load-exercises-protocols'

export class DbLoadExercises implements LoadExercises {
  constructor (
    private readonly loadExercisesRepository: LoadExercisesRepository
  ) {}

  async load (accountId: string): Promise<ExerciseModel[]> {
    const exercises = await this.loadExercisesRepository.loadAll(accountId)
    return exercises
  }
}
