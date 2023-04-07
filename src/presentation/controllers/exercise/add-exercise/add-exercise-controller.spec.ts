import { badRequest } from '../../../helpers/http/http-helper'
import { AddExerciseController } from './add-exercise-controller'
import { AddExercise, AddExerciseModel, ExerciseModel, HttpRequest, Validation } from './add-exercise-controller-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeAddExercise = (): AddExercise => {
  class AddExerciseStub implements AddExercise {
    async add (data: AddExerciseModel): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(makeFakeExercise()))
    }
  }
  return new AddExerciseStub()
}

const makeFakeExercise = (): ExerciseModel => ({
  id: 'valid_id',
  name: 'valid_name',
  series: 1,
  betweenSeriesTime: 120,
  repetitions: 12,
  repetitionTime: 4.5
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    series: 1,
    betweenSeriesTime: 120,
    repetitions: 12,
    repetitionTime: 4.5
  }
})

interface SutTypes {
  sut: AddExerciseController
  validationStub: Validation
  addExerciseStub: AddExercise
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addExerciseStub = makeAddExercise()
  const sut = new AddExerciseController(validationStub, addExerciseStub)
  return {
    sut,
    validationStub,
    addExerciseStub
  }
}

describe('AddExercise Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('Should call AddExercise with correct values', async () => {
    const { sut, addExerciseStub } = makeSut()
    const addSpy = jest.spyOn(addExerciseStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
