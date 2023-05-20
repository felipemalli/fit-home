import { DbAddExercise } from './db-add-exercise'
import { AddExerciseRepository, mockAddExerciseRepository, mockAddExerciseParams, mockExerciseModel, throwError } from './db-add-exercise-protocols'

interface SutTypes {
  sut: DbAddExercise
  addExerciseRepositoryStub: AddExerciseRepository
}

const makeSut = (): SutTypes => {
  const addExerciseRepositoryStub = mockAddExerciseRepository()
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
    const exerciseData = mockAddExerciseParams()
    await sut.add(exerciseData)
    expect(addSpy).toHaveBeenCalledWith(exerciseData)
  })

  it('Should throw if AddExerciseRepository throws', async () => {
    const { sut, addExerciseRepositoryStub } = makeSut()
    jest.spyOn(addExerciseRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddExerciseParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an exercise on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddExerciseParams())
    expect(account).toEqual(mockExerciseModel())
  })
})
