import { UpdateExerciseController } from './update-exercise-controller'
import { CheckExerciseByIdSpy, throwError, UpdateExerciseSpy } from './update-exercise-controller-protocols'
import { InvalidParamError } from '#/presentation/errors'
import { forbidden, ok, serverError } from '#/presentation/helpers/http/http-helper'

const mockRequest = (): UpdateExerciseController.Request => ({
  name: 'updated_name',
  description: 'updated_description',
  isTemplate: false,
  exerciseId: 'any_exercise_id'
})

interface SutTypes {
  sut: UpdateExerciseController
  checkExerciseByIdSpy: CheckExerciseByIdSpy
  updateExerciseSpy: UpdateExerciseSpy
}

const makeSut = (): SutTypes => {
  const checkExerciseByIdSpy = new CheckExerciseByIdSpy()
  const updateExerciseSpy = new UpdateExerciseSpy()
  const sut = new UpdateExerciseController(checkExerciseByIdSpy, updateExerciseSpy)
  return {
    sut,
    checkExerciseByIdSpy,
    updateExerciseSpy
  }
}

describe('UpdateExercise Controller', () => {
  it('Should call CheckExerciseById with correct value', async () => {
    const { sut, checkExerciseByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkExerciseByIdSpy.id).toBe(request.exerciseId)
  })

  it('Should return 403 if CheckExerciseById returns false', async () => {
    const { sut, checkExerciseByIdSpy } = makeSut()
    checkExerciseByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('exerciseId')))
  })

  it('Should return 500 if CheckExerciseById throws', async () => {
    const { sut, checkExerciseByIdSpy } = makeSut()
    jest.spyOn(checkExerciseByIdSpy, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call SaveExercise with correct values', async () => {
    const { sut, updateExerciseSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    const { exerciseId, ...updatedParams } = request
    expect(updateExerciseSpy.id).toBe(exerciseId)
    expect(updateExerciseSpy.updatedParams).toEqual(updatedParams)
  })

  it('Should return 500 if SaveExercise throws', async () => {
    const { sut, updateExerciseSpy } = makeSut()
    jest.spyOn(updateExerciseSpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut, updateExerciseSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updateExerciseSpy.result))
  })
})
