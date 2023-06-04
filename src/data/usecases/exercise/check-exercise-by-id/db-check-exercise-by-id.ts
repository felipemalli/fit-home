import { CheckExerciseByIdRepository, CheckExerciseById } from './db-check-exercise-by-id-protocols'

export class DbCheckExerciseById implements CheckExerciseById {
  constructor (
    private readonly checkExerciseByIdRepository: CheckExerciseByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckExerciseByIdRepository.Result> {
    return await this.checkExerciseByIdRepository.checkById(id)
  }
}
