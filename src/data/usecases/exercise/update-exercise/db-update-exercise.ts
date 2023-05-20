import { UpdateExerciseRepository, ExerciseModel, UpdateExercise, UpdateExerciseData } from './db-update-exercise-protocols'

export class DbUpdateExercise implements UpdateExercise {
  constructor (
    private readonly updateExerciseRepository: UpdateExerciseRepository
  ) {}

  async update (id: string, data: UpdateExerciseData): Promise<ExerciseModel> {
    const exercise = await this.updateExerciseRepository.update(id, data)
    return exercise
  }
}
