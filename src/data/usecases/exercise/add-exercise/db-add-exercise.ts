
import { AddExercise, AddExerciseParams, AddExerciseRepository, ExerciseModel } from './db-add-exercise-protocols'

export class DbAddExercise implements AddExercise {
  constructor (
    private readonly addExerciseRepository: AddExerciseRepository
  ) {}

  async add (exerciseData: AddExerciseParams): Promise<ExerciseModel> {
    const exercise = await this.addExerciseRepository.add(exerciseData)
    return exercise
  }
}
