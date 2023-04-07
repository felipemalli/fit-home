import { AddExerciseController } from './add-exercise-controller'
import { HttpRequest, Validation } from './add-exercise-controller-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    series: 1,
    betweenSeriesTime: 120,
    repetitions: 12,
    repetitionTime: 4.5
  }
})

describe('AddExercise Controller', () => {
  it('Should call Validation with correct values', async () => {
    const validationStub = makeValidation()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddExerciseController(validationStub)
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
