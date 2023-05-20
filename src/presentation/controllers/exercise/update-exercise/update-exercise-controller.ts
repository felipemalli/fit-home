import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadExerciseById } from './update-exercise-controller-protocols'

export class UpdateExerciseController implements Controller {
  constructor (
    private readonly loadExerciseById: LoadExerciseById
  ) {}

  async handle (httpRequest: HttpRequest<any, any>): Promise<HttpResponse> {
    try {
      const exercise = await this.loadExerciseById.loadById(httpRequest.params.exerciseId)
      if (!exercise) {
        return forbidden(new InvalidParamError('exerciseId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
