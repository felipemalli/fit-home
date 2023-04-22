import { LoadExercises } from '../../../domain/usecases/load-exercises'
import { LoadExercisesRepository } from '../../protocols/db/exercise/load-exercises-repository'
import { ExerciseModel } from '../add-exercise/db-add-exercise-protocols'

export class DbLoadExercises implements LoadExercises {
  constructor (
    private readonly loadExercisesRepository: LoadExercisesRepository
  ) {}

  async load (accountId: string): Promise<ExerciseModel[]> {
    const exercises = await this.loadExercisesRepository.loadAll(accountId)
    return exercises
  }
}
