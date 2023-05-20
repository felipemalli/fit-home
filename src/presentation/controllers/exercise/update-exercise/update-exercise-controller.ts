import { Controller, HttpRequest, HttpResponse, LoadExerciseById } from './update-exercise-controller-protocols'

export class UpdateExerciseController implements Controller {
  constructor (
    private readonly loadExerciseById: LoadExerciseById
  ) {}

  async handle (httpRequest: HttpRequest<any, any>): Promise<HttpResponse> {
    await this.loadExerciseById.loadById(httpRequest.params.exerciseId)
    return null
  }
}
