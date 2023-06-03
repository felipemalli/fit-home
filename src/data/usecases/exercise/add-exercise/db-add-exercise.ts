
import { AddExercise, AddExerciseRepository } from './db-add-exercise-protocols'

export class DbAddExercise implements AddExercise {
  constructor (
    private readonly addExerciseRepository: AddExerciseRepository
  ) {}

  async add (exerciseData: AddExercise.Params): Promise<AddExercise.Result> {
    const exercise = await this.addExerciseRepository.add(exerciseData)
    return exercise
  }
}
