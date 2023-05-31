import { DbLoadExercises } from './db-load-exercises'
import { throwError, LoadExercisesRepositorySpy } from './db-load-exercises-protocols'

interface SutTypes {
  sut: DbLoadExercises
  loadExercisesRepositorySpy: LoadExercisesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadExercisesRepositorySpy = new LoadExercisesRepositorySpy()
  const sut = new DbLoadExercises(loadExercisesRepositorySpy)
  return {
    sut,
    loadExercisesRepositorySpy
  }
}

const accountId = 'any_id'

describe('DbLoadExercises', () => {
  it('Should call LoadExercisesRepository with correct value', async () => {
    const { sut, loadExercisesRepositorySpy } = makeSut()
    await sut.load(accountId)
    expect(loadExercisesRepositorySpy.accountId).toBe(accountId)
  })

  it('Should throw if LoadExercisesRepository throws', async () => {
    const { sut, loadExercisesRepositorySpy } = makeSut()
    jest.spyOn(loadExercisesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of Exercises on success', async () => {
    const { sut, loadExercisesRepositorySpy } = makeSut()
    const exercises = await sut.load(accountId)
    expect(exercises).toEqual(loadExercisesRepositorySpy.result)
  })
})
