import { DbLoadExercises } from './db-load-exercises'
import { LoadExercisesRepository, ExerciseModel } from './db-load-exercises-protocols'

const makeFakeExercises = (): ExerciseModel[] => {
  return [{
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
  }, {
    id: 'other_id',
    name: 'other_name',
    accountId: 'other_account_id',
    isTemplate: true,
    variations: [{
      id: 'other_variation_id',
      name: 'other_variation_name',
      configuration: {
        series: 3,
        betweenSeriesTime: 70,
        repetitions: 8,
        repetitionTime: 3.8
      }
    }]
  }]
}

const makeLoadExercisesRepository = (): LoadExercisesRepository => {
  class LoadExercisesRepositoryStub implements LoadExercisesRepository {
    async loadAll (accountId: string): Promise<ExerciseModel[]> {
      return await new Promise(resolve => resolve(makeFakeExercises()))
    }
  }
  return new LoadExercisesRepositoryStub()
}

interface SutTypes {
  sut: DbLoadExercises
  loadExercisesRepositoryStub: LoadExercisesRepository
}

const makeSut = (): SutTypes => {
  const loadExercisesRepositoryStub = makeLoadExercisesRepository()
  const sut = new DbLoadExercises(loadExercisesRepositoryStub)
  return {
    sut,
    loadExercisesRepositoryStub
  }
}

describe('DbLoadExercises', () => {
  it('Should call LoadExercisesRepository with correct values', async () => {
    const { sut, loadExercisesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadExercisesRepositoryStub, 'loadAll')
    await sut.load('any_id')
    expect(loadAllSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if LoadExercisesRepository throws', async () => {
    const { sut, loadExercisesRepositoryStub } = makeSut()
    jest.spyOn(loadExercisesRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of Exercises on success', async () => {
    const { sut } = makeSut()
    const exercises = await sut.load('any_id')
    expect(exercises).toEqual(makeFakeExercises())
  })
})