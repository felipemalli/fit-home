import { Controller, HttpRequest, HttpResponse, Validation } from './add-exercise-controller-protocols'

export class AddExerciseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => resolve({
      statusCode: 404,
      body: 'Not implemented'
    }))
  }
}
