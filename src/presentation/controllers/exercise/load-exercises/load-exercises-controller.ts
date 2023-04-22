import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadExercises } from './load-exercises-protocols'

export class LoadExercisesController implements Controller {
  constructor (private readonly loadExercises: LoadExercises) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const exercises = await this.loadExercises.load(httpRequest.body.accountId)
      return ok(exercises)
    } catch (error) {
      return serverError(error)
    }
  }
}
