import { AddExerciseController } from './add-exercise-controller'
import { AddExercise, AddExerciseRequestBody, HttpRequest, Validation, throwError, mockExerciseModel, mockAddExercise, ValidationSpy } from './add-exercise-controller-protocols'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest<AddExerciseRequestBody> => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    isTemplate: true,
    variationName: 'any_variation_name',
    variationDescription: 'any_variation_description',
    variationUrl: 'https://www.any_variation_url.com/',
    series: 1,
    betweenSeriesTime: 120,
    repetitions: 12,
    repetitionTime: 4.5,
    warmupTime: 0,
    weight: 10
  },
  accountId: 'any_id'
})

interface SutTypes {
  sut: AddExerciseController
  validationStub: Validation
  addExerciseStub: AddExercise
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationSpy()
  const addExerciseStub = mockAddExercise()
  const sut = new AddExerciseController(validationStub, addExerciseStub)
  return {
    sut,
    validationStub,
    addExerciseStub
  }
}

describe('AddExercise Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('Should call AddExercise with correct values', async () => {
    const { sut, addExerciseStub } = makeSut()
    const addSpy = jest.spyOn(addExerciseStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({ ...httpRequest.body, accountId: 'any_id' })
  })

  it('Should call AddExercise with isTemplate false if is not passed', async () => {
    const { sut, addExerciseStub } = makeSut()
    const addSpy = jest.spyOn(addExerciseStub, 'add')
    const httpRequest = mockRequest()
    if (httpRequest.body) httpRequest.body.isTemplate = undefined
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({ ...httpRequest.body, accountId: 'any_id', isTemplate: false })
  })

  it('Should return 500 if AddExercise throws', async () => {
    const { sut, addExerciseStub } = makeSut()
    jest.spyOn(addExerciseStub, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(created(mockExerciseModel()))
  })
})
