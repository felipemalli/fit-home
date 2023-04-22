import { ok } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadExercises } from './load-exercises-protocols'

export class LoadExercisesController implements Controller {
  constructor (private readonly loadExercises: LoadExercises) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const exercises = await this.loadExercises.load()
    return ok(exercises)
  }
}
