import { AddExercise, AddExerciseRepository } from './db-add-exercise-protocols'

export class DbAddExercise implements AddExercise {
  constructor (
    private readonly addExerciseRepository: AddExerciseRepository
  ) {}

  async add (exerciseData: AddExercise.Params): Promise<void> {
    await this.addExerciseRepository.add(exerciseData)
  }
}
