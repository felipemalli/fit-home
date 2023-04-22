import { ok } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadExercises } from './load-exercises-protocols'

export class LoadExercisesController implements Controller {
  constructor (private readonly loadExercises: LoadExercises) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadExercises.load()
    return ok({})
  }
}
