
import { AddExercise, AddExerciseModel, AddExerciseRepository, ExerciseModel } from './db-add-exercise-protocols'

export class DbAddExercise implements AddExercise {
  constructor (
    private readonly addExerciseRepository: AddExerciseRepository
  ) {}

  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exercise = await this.addExerciseRepository.add(exerciseData)
    return exercise
  }
}
