import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { LoadExercises } from '@/domain/usecases/load-exercises'
import { ExerciseModel } from '@/domain/models/exercises/exercise'

export class DbLoadExercises implements LoadExercises {
  constructor (
    private readonly loadExercisesRepository: LoadExercisesRepository
  ) {}

  async load (accountId: string): Promise<ExerciseModel[]> {
    const exercises = await this.loadExercisesRepository.loadAll(accountId)
    return exercises
  }
}
