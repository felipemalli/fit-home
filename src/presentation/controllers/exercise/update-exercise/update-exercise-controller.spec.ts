import { UpdateExerciseController } from './update-exercise-controller'
import { LoadExerciseByIdSpy, throwError, UpdateExerciseSpy } from './update-exercise-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): UpdateExerciseController.Request => ({
  name: 'updated_name',
  description: 'updated_description',
  isTemplate: false,
  exerciseId: 'any_exercise_id'
})

interface SutTypes {
  sut: UpdateExerciseController
  loadExerciseByIdSpy: LoadExerciseByIdSpy
  updateExerciseSpy: UpdateExerciseSpy
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdSpy = new LoadExerciseByIdSpy()
  const updateExerciseSpy = new UpdateExerciseSpy()
  const sut = new UpdateExerciseController(loadExerciseByIdSpy, updateExerciseSpy)
  return {
    sut,
    loadExerciseByIdSpy,
    updateExerciseSpy
  }
}

describe('UpdateExercise Controller', () => {
  it('Should call LoadExerciseById with correct value', async () => {
    const { sut, loadExerciseByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadExerciseByIdSpy.id).toBe(request.exerciseId)
  })

  it('Should return 403 if LoadExerciseById returns null', async () => {
    const { sut, loadExerciseByIdSpy } = makeSut()
    loadExerciseByIdSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('exerciseId')))
  })

  it('Should return 500 if LoadExerciseById throws', async () => {
    const { sut, loadExerciseByIdSpy } = makeSut()
    jest.spyOn(loadExerciseByIdSpy, 'loadById').mockImplementationOnce(throwError)
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
