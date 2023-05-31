import { AddExerciseController } from './add-exercise-controller'
import { AddExerciseRequestBody, HttpRequest, throwError, ValidationSpy, AddExerciseSpy } from './add-exercise-controller-protocols'
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
  validationSpy: ValidationSpy
  addExerciseSpy: AddExerciseSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addExerciseSpy = new AddExerciseSpy()
  const sut = new AddExerciseController(validationSpy, addExerciseSpy)
  return {
    sut,
    validationSpy,
    addExerciseSpy
  }
}

describe('AddExercise Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  it('Should call AddExercise with correct values', async () => {
    const { sut, addExerciseSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addExerciseSpy.params).toEqual(
      {
        ...httpRequest.body,
        accountId: httpRequest.accountId
      }
    )
  })

  it('Should call AddExercise with isTemplate false if is not passed', async () => {
    const { sut, addExerciseSpy } = makeSut()
    const httpRequest = mockRequest()
    if (httpRequest.body) httpRequest.body.isTemplate = undefined
    await sut.handle(httpRequest)
    expect(addExerciseSpy.params).toEqual(
      {
        ...httpRequest.body,
        accountId: httpRequest.accountId,
        isTemplate: false
      })
  })

  it('Should return 500 if AddExercise throws', async () => {
    const { sut, addExerciseSpy } = makeSut()
    jest.spyOn(addExerciseSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 201 on success', async () => {
    const { sut, addExerciseSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(created(addExerciseSpy.result))
  })
})
