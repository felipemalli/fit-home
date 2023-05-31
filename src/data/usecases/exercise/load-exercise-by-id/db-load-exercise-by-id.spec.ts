import { DbLoadExerciseById } from './db-load-exercise-by-id'
import { throwError, LoadExerciseByIdRepositorySpy } from './db-load-exercise-by-id-protocols'

interface SutTypes {
  sut: DbLoadExerciseById
  loadExerciseByIdRepositorySpy: LoadExerciseByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdRepositorySpy = new LoadExerciseByIdRepositorySpy()
  const sut = new DbLoadExerciseById(loadExerciseByIdRepositorySpy)
  return {
    sut,
    loadExerciseByIdRepositorySpy
  }
}

const id = 'any_id'

describe('DbLoadExerciseById', () => {
  it('Should call LoadExerciseByIdRepository with correct id', async () => {
    const { sut, loadExerciseByIdRepositorySpy } = makeSut()
    await sut.loadById(id)
    expect(loadExerciseByIdRepositorySpy.id).toBe(id)
  })

  it('Should throw if LoadExerciseByIdRepository throws', async () => {
    const { sut, loadExerciseByIdRepositorySpy } = makeSut()
    jest.spyOn(loadExerciseByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(id)
    await expect(promise).rejects.toThrow()
  })

  it('Should return a Exercise on success', async () => {
    const { sut, loadExerciseByIdRepositorySpy } = makeSut()
    const exercise = await sut.loadById(id)
    expect(exercise).toEqual(loadExerciseByIdRepositorySpy.result)
  })
})
