import { DbAddExercise } from './db-add-exercise'
import { mockAddExerciseParams, throwError, AddExerciseRepositorySpy } from './db-add-exercise-protocols'

interface SutTypes {
  sut: DbAddExercise
  addExerciseRepositorySpy: AddExerciseRepositorySpy
}

const makeSut = (): SutTypes => {
  const addExerciseRepositorySpy = new AddExerciseRepositorySpy()
  const sut = new DbAddExercise(addExerciseRepositorySpy)
  return {
    sut,
    addExerciseRepositorySpy
  }
}

describe('DbAddExercise UseCase', () => {
  it('Should call AddExerciseRepository with correct values', async () => {
    const { sut, addExerciseRepositorySpy } = makeSut()
    const exerciseData = mockAddExerciseParams()
    await sut.add(exerciseData)
    expect(addExerciseRepositorySpy.params).toBe(exerciseData)
  })

  it('Should throw if AddExerciseRepository throws', async () => {
    const { sut, addExerciseRepositorySpy } = makeSut()
    jest.spyOn(addExerciseRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddExerciseParams())
    await expect(promise).rejects.toThrow()
  })
})
