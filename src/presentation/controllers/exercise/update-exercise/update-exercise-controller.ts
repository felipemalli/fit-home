
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadExerciseById, UpdateExercise } from './update-exercise-controller-protocols'

export class UpdateExerciseController implements Controller {
  constructor (
    private readonly loadExerciseById: LoadExerciseById,
    private readonly updateExercise: UpdateExercise
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const exercise = await this.loadExerciseById.loadById(httpRequest.params.exerciseId)
      if (!exercise) {
        return forbidden(new InvalidParamError('exerciseId'))
      }
      const updatedExercise = await this.updateExercise.update(httpRequest.params.exerciseId, httpRequest.body)
      return ok(updatedExercise)
    } catch (error) {
      return serverError(error)
    }
  }
}
