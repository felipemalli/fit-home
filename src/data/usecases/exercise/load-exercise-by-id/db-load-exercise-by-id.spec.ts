import { DbLoadExerciseById } from './db-load-exercise-by-id'
import { LoadExerciseByIdRepository, throwError, mockExerciseModel, mockLoadExerciseByIdRepository } from './db-load-exercise-by-id-protocols'

interface SutTypes {
  sut: DbLoadExerciseById
  loadExerciseByIdRepositoryStub: LoadExerciseByIdRepository
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdRepositoryStub = mockLoadExerciseByIdRepository()
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
    jest.spyOn(loadExerciseByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('Should return a Exercise on success', async () => {
    const { sut } = makeSut()
    const exercise = await sut.loadById('any_id')
    expect(exercise).toEqual(mockExerciseModel())
  })
})
