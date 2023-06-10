import { Controller, HttpResponse, LoadExercises } from './load-exercises-controller-protocols'
import { noContent, ok, serverError } from '#/presentation/helpers/http/http-helper'

export class LoadExercisesController implements Controller {
  constructor (private readonly loadExercises: LoadExercises) {}

  async handle (request: LoadExercisesController.Request): Promise<HttpResponse> {
    try {
      const exercises = await this.loadExercises.load(request.accountId)
      return exercises.length ? ok(exercises) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadExercisesController {
  export interface Request {
    accountId: string
  }
}
