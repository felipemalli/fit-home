import { AddExerciseController } from './add-exercise-controller'
import { AddExercise, AddExerciseBodyModel, AddExerciseModel, ExerciseModel, HttpRequest, Validation } from './add-exercise-controller-protocols'
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper'

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
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  accountId: 'any_account_id',
  isTemplate: true,
  variations: [{
    id: 'any_variation_id',
    name: 'any_variation_name',
    description: 'any_variation_description',
    url: 'https://www.any_variation_url.com/',
    configuration: {
      series: 1,
      betweenSeriesTime: 120,
      repetitions: 12,
      repetitionTime: 4.5,
      warmupTime: 0,
      weight: 10
    }
  }]
})

const makeFakeRequest = (): HttpRequest<AddExerciseBodyModel> => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    isTemplate: true,
    variationName: 'any_variation_name',
    variationDescription: 'any_variation_description',
    variationUrl: 'https://www.any_variation_url.com/',
    series: 1,
    betweenSeriesTime: 120,
    repetitions: 12,
    repetitionTime: 4.5,
    warmupTime: 0,
    weight: 10
  },
  accountId: 'any_id'
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
    expect(addSpy).toHaveBeenCalledWith({ ...httpRequest.body, accountId: 'any_id' })
  })

  it('Should return 500 if AddExercise throws', async () => {
    const { sut, addExerciseStub } = makeSut()
    jest.spyOn(addExerciseStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeExercise()))
  })
})
