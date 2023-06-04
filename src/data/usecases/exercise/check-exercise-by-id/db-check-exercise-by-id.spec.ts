import { DbCheckExerciseById } from './db-check-exercise-by-id'
import { throwError, CheckExerciseByIdRepositorySpy } from './db-check-exercise-by-id-protocols'

interface SutTypes {
  sut: DbCheckExerciseById
  checkExerciseByIdRepositorySpy: CheckExerciseByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkExerciseByIdRepositorySpy = new CheckExerciseByIdRepositorySpy()
  const sut = new DbCheckExerciseById(checkExerciseByIdRepositorySpy)
  return {
    sut,
    checkExerciseByIdRepositorySpy
  }
}

const id = 'any_id'

describe('DbCheckExerciseById', () => {
  it('Should call CheckExerciseByIdRepository with correct value', async () => {
    const { sut, checkExerciseByIdRepositorySpy } = makeSut()
    await sut.checkById(id)
    expect(checkExerciseByIdRepositorySpy.id).toBe(id)
  })

  it('Should throw if CheckExerciseByIdRepository throws', async () => {
    const { sut, checkExerciseByIdRepositorySpy } = makeSut()
    jest.spyOn(checkExerciseByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById(id)
    await expect(promise).rejects.toThrow()
  })

  it('Should return true on success', async () => {
    const { sut, checkExerciseByIdRepositorySpy } = makeSut()
    const exercise = await sut.checkById(id)
    expect(exercise).toEqual(checkExerciseByIdRepositorySpy.result)
  })
})
