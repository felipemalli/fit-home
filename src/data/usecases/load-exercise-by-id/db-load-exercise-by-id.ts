import { LoadExerciseByIdRepository } from '@/data/protocols/db/exercise/load-exercise-by-id-repository'
import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { LoadExerciseById } from '@/domain/usecases/load-exercise-by-id'

export class DbLoadExerciseById implements LoadExerciseById {
  constructor (
    private readonly loadExerciseByIdRepository: LoadExerciseByIdRepository
  ) {}

  async loadById (id: string): Promise<ExerciseModel> {
    await this.loadExerciseByIdRepository.loadById(id)
    return null
  }
}
