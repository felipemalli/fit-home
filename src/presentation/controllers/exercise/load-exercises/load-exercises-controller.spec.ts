import { LoadExercisesController } from './load-exercises-controller'
import { HttpRequest, LoadExercises, mockLoadExercises, mockExerciseModels, throwError } from './load-exercises-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): HttpRequest => ({
  accountId: 'any_id'
})

interface SutTypes {
  sut: LoadExercisesController
  loadExercisesStub: LoadExercises
}

const makeSut = (): SutTypes => {
  const loadExercisesStub = mockLoadExercises()
  const sut = new LoadExercisesController(loadExercisesStub)
  return {
    sut,
    loadExercisesStub
  }
}

describe('LoadExercises Controller', () => {
  it('Should call LoadExercises with correct values', async () => {
    const { sut, loadExercisesStub } = makeSut()
    const loadSpy = jest.spyOn(loadExercisesStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId)
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockExerciseModels()))
  })

  it('Should return 204 if LoadExercises returns empty', async () => {
    const { sut, loadExercisesStub } = makeSut()
    jest.spyOn(loadExercisesStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if LoadExercises throws', async () => {
    const { sut, loadExercisesStub } = makeSut()
    jest.spyOn(loadExercisesStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
