import { UpdateExerciseController } from './update-exercise-controller'
import { HttpRequest, LoadExerciseById, mockLoadExerciseById, mockUpdateExercise, mockUpdateExerciseModel, throwError, UpdateExercise, UpdateExerciseRequestBody, UpdateExerciseRequestParams } from './update-exercise-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest<UpdateExerciseRequestBody, UpdateExerciseRequestParams> => ({
  body: {
    name: 'updated_name',
    description: 'updated_description',
    isTemplate: false
  },
  params: {
    exerciseId: 'any_exercise_id'
  }
})

interface SutTypes {
  sut: UpdateExerciseController
  loadExerciseByIdStub: LoadExerciseById
  updateExerciseStub: UpdateExercise
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdStub = mockLoadExerciseById()
  const updateExerciseStub = mockUpdateExercise()
  const sut = new UpdateExerciseController(loadExerciseByIdStub, updateExerciseStub)
  return {
    sut,
    loadExerciseByIdStub,
    updateExerciseStub
  }
}

describe('UpdateExercise Controller', () => {
  it('Should call LoadExerciseById with correct values', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadExerciseByIdStub, 'loadById')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.params?.exerciseId)
  })

  it('Should return 403 if LoadExerciseById returns null', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    jest.spyOn(loadExerciseByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('exerciseId')))
  })

  it('Should return 500 if LoadExerciseById throws', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    jest.spyOn(loadExerciseByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call SaveExercise with correct values', async () => {
    const { sut, updateExerciseStub } = makeSut()
    const updateSpy = jest.spyOn(updateExerciseStub, 'update')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith(httpRequest.params?.exerciseId, httpRequest.body)
  })

  it('Should return 500 if SaveExercise throws', async () => {
    const { sut, updateExerciseStub } = makeSut()
    jest.spyOn(updateExerciseStub, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockUpdateExerciseModel()))
  })
})
