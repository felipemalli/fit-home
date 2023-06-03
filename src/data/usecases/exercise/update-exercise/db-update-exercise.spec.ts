import { DbUpdateExercise } from './db-update-exercise'
import { throwError, mockUpdateExerciseParams, UpdateExerciseRepositorySpy } from './db-update-exercise-protocols'

interface SutTypes {
  sut: DbUpdateExercise
  updateExerciseRepositorySpy: UpdateExerciseRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateExerciseRepositorySpy = new UpdateExerciseRepositorySpy()
  const sut = new DbUpdateExercise(updateExerciseRepositorySpy)
  return {
    sut,
    updateExerciseRepositorySpy
  }
}

const id = 'any_id'

describe('DbUpdateExercise UseCase', () => {
  it('Should call UpdateExerciseRepository with correct values', async () => {
    const { sut, updateExerciseRepositorySpy } = makeSut()
    const updateExerciseParams = mockUpdateExerciseParams()
    await sut.update(id, updateExerciseParams)
    expect(updateExerciseRepositorySpy.id).toBe(id)
    expect(updateExerciseRepositorySpy.updatedParams).toBe(updateExerciseParams)
  })

  it('Should throw if UpdateExerciseRepository throws', async () => {
    const { sut, updateExerciseRepositorySpy } = makeSut()
    jest.spyOn(updateExerciseRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(id, mockUpdateExerciseParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an Exercise on success', async () => {
    const { sut, updateExerciseRepositorySpy } = makeSut()
    const exercise = await sut.update(id, mockUpdateExerciseParams())
    expect(exercise).toEqual(updateExerciseRepositorySpy.result)
  })
})
