import { UpdateExerciseRepository, ExerciseModel, UpdateExercise, UpdateExerciseModel } from './db-update-exercise-protocols'

export class DbUpdateExercise implements UpdateExercise {
  constructor (
    private readonly updateExerciseRepository: UpdateExerciseRepository
  ) {}

  async update (data: UpdateExerciseModel): Promise<ExerciseModel> {
    const exercise = await this.updateExerciseRepository.update(data)
    return exercise
  }
}
