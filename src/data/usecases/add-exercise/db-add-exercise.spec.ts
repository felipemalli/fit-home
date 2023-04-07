
import { DbAddExercise } from './db-add-exercise'
import { AddExerciseModel, AddExerciseRepository, ExerciseModel } from './db-add-exercise-protocols'

const makeFakeExercise = (): ExerciseModel => ({
  id: 'any_id',
  name: 'any_name',
  series: 1,
  betweenSeriesTime: 120,
  repetitions: 12,
  repetitionTime: 4.5
})

const makeFakeExerciseData = (): AddExerciseModel => ({
  name: 'any_name',
  series: 1,
  betweenSeriesTime: 120,
  repetitions: 12,
  repetitionTime: 4.5
})

describe('DbAddExercise UseCase', () => {
  it('Should call AddExerciseRepository with correct values', async () => {
    class AddExerciseRepositoryStub implements AddExerciseRepository {
      async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
        return await new Promise(resolve => resolve(makeFakeExercise()))
      }
    }
    const addExerciseRepositoryStub = new AddExerciseRepositoryStub()
    const addSpy = jest.spyOn(addExerciseRepositoryStub, 'add')
    const sut = new DbAddExercise(addExerciseRepositoryStub)
    const exerciseData = makeFakeExerciseData()
    await sut.add(exerciseData)
    expect(addSpy).toHaveBeenCalledWith(exerciseData)
  })
})
