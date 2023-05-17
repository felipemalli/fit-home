import { DbLoadExerciseById } from './db-load-exercise-by-id'
import { LoadExerciseByIdRepository, ExerciseModel } from './db-load-exercise-by-id-protocols'

const makeFakeExercise = (): ExerciseModel => {
  return {
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
  }
}

const makeLoadExerciseByIdRepository = (): LoadExerciseByIdRepository => {
  class LoadExerciseByIdRepositoryStub implements LoadExerciseByIdRepository {
    async loadById (id: string): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(makeFakeExercise()))
    }
  }
  return new LoadExerciseByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadExerciseById
  loadExerciseByIdRepositoryStub: LoadExerciseByIdRepository
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdRepositoryStub = makeLoadExerciseByIdRepository()
  const sut = new DbLoadExerciseById(loadExerciseByIdRepositoryStub)
  return {
    sut,
    loadExerciseByIdRepositoryStub
  }
}

describe('DbLoadExerciseById', () => {
  it('Should call LoadExerciseByIdRepository with correct id', async () => {
    const { sut, loadExerciseByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadExerciseByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if LoadExerciseByIdRepository throws', async () => {
    const { sut, loadExerciseByIdRepositoryStub } = makeSut()
    jest.spyOn(loadExerciseByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('Should return a Exercise on success', async () => {
    const { sut } = makeSut()
    const exercise = await sut.loadById('any_id')
    expect(exercise).toEqual(makeFakeExercise())
  })
})
