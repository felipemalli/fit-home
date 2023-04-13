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
      const { name, description, url, series, betweenSeriesTime, repetitions, repetitionTime } = httpRequest.body
      const exercise = await this.addExercise.add({
        name,
        description,
        url,
        series,
        betweenSeriesTime,
        repetitions,
        repetitionTime
      })
      return created(exercise)
    } catch (error) {
      return serverError(error)
    }
  }
}
