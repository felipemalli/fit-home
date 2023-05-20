
import { DbAddExercise } from './db-add-exercise'
import { AddExerciseModel, AddExerciseRepository, ExerciseModel } from './db-add-exercise-protocols'

const makeFakeExercise = (): ExerciseModel => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  accountId: 'any_account_id',
  isTemplate: true,
  variations: [{
    id: 'any_variation_id',
    name: 'any_variation_name',
    description: 'any_variation_description',
    url: 'https://www.any_variation_url.com/',
    configuration: {
      series: 1,
      betweenSeriesTime: 120,
      repetitions: 12,
      repetitionTime: 4.5,
      warmupTime: 0,
      weight: 10
    }
  }]
})

const makeFakeExerciseData = (): AddExerciseModel => ({
  name: 'any_name',
  description: 'any_description',
  accountId: 'any_account_id',
  isTemplate: true,
  variationName: 'any_variation_name',
  variationDescription: 'any_variation_description',
  variationUrl: 'https://www.any_variation_url.com/',
  series: 1,
  betweenSeriesTime: 120,
  repetitions: 12,
  repetitionTime: 4.5,
  warmupTime: 0,
  weight: 10
})

const makeAddExerciseRepository = (): AddExerciseRepository => {
  class AddExerciseRepositoryStub implements AddExerciseRepository {
    async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(makeFakeExercise()))
    }
  }
  return new AddExerciseRepositoryStub()
}

interface SutTypes {
  sut: DbAddExercise
  addExerciseRepositoryStub: AddExerciseRepository
}

const makeSut = (): SutTypes => {
  const addExerciseRepositoryStub = makeAddExerciseRepository()
  const sut = new DbAddExercise(addExerciseRepositoryStub)
  return {
    sut,
    addExerciseRepositoryStub
  }
}

describe('DbAddExercise UseCase', () => {
  it('Should call AddExerciseRepository with correct values', async () => {
    const { sut, addExerciseRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addExerciseRepositoryStub, 'add')
    const exerciseData = makeFakeExerciseData()
    await sut.add(exerciseData)
    expect(addSpy).toHaveBeenCalledWith(exerciseData)
  })

  it('Should throw if AddExerciseRepository throws', async () => {
    const { sut, addExerciseRepositoryStub } = makeSut()
    jest.spyOn(addExerciseRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeExerciseData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an exercise on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeExerciseData())
    expect(account).toEqual(makeFakeExercise())
  })
})
