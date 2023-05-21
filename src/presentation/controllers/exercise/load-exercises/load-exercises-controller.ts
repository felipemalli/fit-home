import { Controller, HttpRequest, HttpResponse, LoadExercises } from './load-exercises-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadExercisesController implements Controller {
  constructor (private readonly loadExercises: LoadExercises) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const exercises = await this.loadExercises.load(httpRequest.accountId!)
      return exercises.length ? ok(exercises) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
