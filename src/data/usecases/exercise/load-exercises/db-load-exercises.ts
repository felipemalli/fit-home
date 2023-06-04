import { LoadExercisesRepository, LoadExercises } from './db-load-exercises-protocols'

export class DbLoadExercises implements LoadExercises {
  constructor (
    private readonly loadExercisesRepository: LoadExercisesRepository
  ) {}

  async load (accountId: string): Promise<LoadExercises.Result> {
    const exercises = await this.loadExercisesRepository.loadAll(accountId)
    return exercises
  }
}
