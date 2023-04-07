import { badRequest, serverError } from '../../../helpers/http/http-helper'
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
      const { name, series, betweenSeriesTime, repetitions, repetitionTime } = httpRequest.body
      await this.addExercise.add({
        name,
        series,
        betweenSeriesTime,
        repetitions,
        repetitionTime
      })
      return await new Promise(resolve => resolve({
        statusCode: 404,
        body: 'Not implemented'
      }))
    } catch (error) {
      return serverError(error)
    }
  }
}
