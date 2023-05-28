import { DbLoadExercises } from './db-load-exercises'
import { LoadExercisesRepository, throwError, mockExerciseModels, mockLoadExercisesRepository } from './db-load-exercises-protocols'

interface SutTypes {
  sut: DbLoadExercises
  loadExercisesRepositoryStub: LoadExercisesRepository
}

const makeSut = (): SutTypes => {
  const loadExercisesRepositoryStub = mockLoadExercisesRepository()
  const sut = new DbLoadExercises(loadExercisesRepositoryStub)
  return {
    sut,
    loadExercisesRepositoryStub
  }
}

describe('DbLoadExercises', () => {
  it('Should call LoadExercisesRepository with correct value', async () => {
    const { sut, loadExercisesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadExercisesRepositoryStub, 'loadAll')
    await sut.load('any_id')
    expect(loadAllSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if LoadExercisesRepository throws', async () => {
    const { sut, loadExercisesRepositoryStub } = makeSut()
    jest.spyOn(loadExercisesRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of Exercises on success', async () => {
    const { sut } = makeSut()
    const exercises = await sut.load('any_id')
    expect(exercises).toEqual(mockExerciseModels())
  })
})
