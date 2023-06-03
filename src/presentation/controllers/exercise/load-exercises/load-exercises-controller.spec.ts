import { LoadExercisesController } from './load-exercises-controller'
import { LoadExercisesSpy, throwError } from './load-exercises-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

const mockRequest = (): LoadExercisesController.Request => ({
  accountId: 'any_id'
})

interface SutTypes {
  sut: LoadExercisesController
  loadExercisesSpy: LoadExercisesSpy
}

const makeSut = (): SutTypes => {
  const loadExercisesSpy = new LoadExercisesSpy()
  const sut = new LoadExercisesController(loadExercisesSpy)
  return {
    sut,
    loadExercisesSpy
  }
}

describe('LoadExercises Controller', () => {
  it('Should call LoadExercises with correct value', async () => {
    const { sut, loadExercisesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadExercisesSpy.accountId).toBe(request.accountId)
  })

  it('Should return 200 on success', async () => {
    const { sut, loadExercisesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadExercisesSpy.result))
  })

  it('Should return 204 if LoadExercises returns empty', async () => {
    const { sut, loadExercisesSpy } = makeSut()
    loadExercisesSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if LoadExercises throws', async () => {
    const { sut, loadExercisesSpy } = makeSut()
    jest.spyOn(loadExercisesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
