import { DbUpdateExercise } from './db-update-exercise'
import { UpdateExerciseRepository, throwError, mockUpdateExerciseParams, mockUpdateExerciseModel, mockUpdateExerciseRepository } from './db-update-exercise-protocols'

interface SutTypes {
  sut: DbUpdateExercise
  updateExerciseRepositoryStub: UpdateExerciseRepository
}

const makeSut = (): SutTypes => {
  const updateExerciseRepositoryStub = mockUpdateExerciseRepository()
  const sut = new DbUpdateExercise(updateExerciseRepositoryStub)
  return {
    sut,
    updateExerciseRepositoryStub
  }
}

describe('DbUpdateExercise UseCase', () => {
  it('Should call UpdateExerciseRepository with correct values', async () => {
    const { sut, updateExerciseRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateExerciseRepositoryStub, 'update')
    const updateExerciseParams = mockUpdateExerciseParams()
    await sut.update('any_id', updateExerciseParams)
    expect(updateSpy).toHaveBeenCalledWith('any_id', updateExerciseParams)
  })

  it('Should throw if UpdateExerciseRepository throws', async () => {
    const { sut, updateExerciseRepositoryStub } = makeSut()
    jest.spyOn(updateExerciseRepositoryStub, 'update').mockImplementationOnce(throwError)
    const promise = sut.update('any_id', mockUpdateExerciseParams())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an Exercise on success', async () => {
    const { sut } = makeSut()
    const exercise = await sut.update('any_id', mockUpdateExerciseParams())
    expect(exercise).toEqual(mockUpdateExerciseModel())
  })
})
