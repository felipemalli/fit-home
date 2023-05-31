import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LogErrorRepositorySpy } from '@/data/test'

class ControllerSpy implements Controller {
  httpRequest: HttpRequest
  httpResponse = ok('any_id')

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return this.httpResponse
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.httpRequest).toBe(request)
  })

  it('Should return the same result as the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    controllerSpy.httpResponse = mockServerError()
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toBe(controllerSpy.httpResponse.body.stack)
  })
})
