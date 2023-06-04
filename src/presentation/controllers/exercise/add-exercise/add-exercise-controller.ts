import { AddExercise, Controller, HttpResponse, Validation } from './add-exercise-controller-protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'

export class AddExerciseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addExercise: AddExercise
  ) {}

  async handle (request: AddExerciseController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, description, accountId, isTemplate, variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight } = request
      await this.addExercise.add({
        name,
        description,
        accountId,
        isTemplate: isTemplate ?? false,
        variationName,
        variationDescription,
        variationUrl,
        series,
        betweenSeriesTime,
        repetitions,
        repetitionTime,
        warmupTime,
        weight
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddExerciseController {
  export interface Request {
    name: string
    description?: string
    accountId: string
    isTemplate?: boolean
    variationName: string
    variationDescription?: string
    variationUrl?: string
    series: number
    betweenSeriesTime: number
    repetitions: number
    repetitionTime: number
    warmupTime: number
    weight?: number
  }
}
