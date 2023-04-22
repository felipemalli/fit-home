import { badRequest, created, serverError } from '../../../helpers/http/http-helper'
import { AddExercise, Controller, HttpRequest, HttpResponse, Validation } from './add-exercise-controller-protocols'

export class AddExerciseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addExercise: AddExercise
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { workoutId, templateId, name, description, variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight } = httpRequest.body
      const exercise = await this.addExercise.add({
        workoutId,
        templateId,
        name,
        description,
        accountId: httpRequest.accountId ?? '',
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
      return created(exercise)
    } catch (error) {
      return serverError(error)
    }
  }
}
