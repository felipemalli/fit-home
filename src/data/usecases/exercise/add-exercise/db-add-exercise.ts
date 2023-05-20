
import { AddExercise, AddExerciseData, AddExerciseRepository, ExerciseModel } from './db-add-exercise-protocols'

export class DbAddExercise implements AddExercise {
  constructor (
    private readonly addExerciseRepository: AddExerciseRepository
  ) {}

  async add (exerciseData: AddExerciseData): Promise<ExerciseModel> {
    const exercise = await this.addExerciseRepository.add(exerciseData)
    return exercise
  }
}
