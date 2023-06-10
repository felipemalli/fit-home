
import { InvalidParamError } from '#/presentation/errors'
import { forbidden, ok, serverError } from '#/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, CheckExerciseById, UpdateExercise } from './update-exercise-controller-protocols'

export class UpdateExerciseController implements Controller {
  constructor (
    private readonly checkExerciseById: CheckExerciseById,
    private readonly updateExercise: UpdateExercise
  ) {}

  async handle (request: UpdateExerciseController.Request): Promise<HttpResponse> {
    try {
      const { exerciseId, ...updatedParams } = request
      const exists = await this.checkExerciseById.checkById(exerciseId)
      if (!exists) {
        return forbidden(new InvalidParamError('exerciseId'))
      }
      const updatedExercise = await this.updateExercise.update(exerciseId, updatedParams)
      return ok(updatedExercise)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateExerciseController {
  export interface Request {
    name?: string
    description?: string
    isTemplate?: boolean
    exerciseId: string
  }
}
