import { LoadExerciseByIdRepository, ExerciseModel, LoadExerciseById } from './db-load-exercise-by-id-protocols'

export class DbLoadExerciseById implements LoadExerciseById {
  constructor (
    private readonly loadExerciseByIdRepository: LoadExerciseByIdRepository
  ) {}

  async loadById (id: string): Promise<ExerciseModel> {
    const exercise = await this.loadExerciseByIdRepository.loadById(id)
    return exercise
  }
}
