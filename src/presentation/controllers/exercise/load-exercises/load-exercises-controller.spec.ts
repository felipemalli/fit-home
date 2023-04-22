import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { LoadExercisesController } from './load-exercises-controller'
import { ExerciseModel, HttpRequest, LoadExercises } from './load-exercises-protocols'

const makeFakeExercises = (): ExerciseModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    workoutId: 'any_workout_id',
    templateId: 'any_template_id',
    accountId: 'any_account_id',
    selectedVariationId: 'any_variation_id',
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
  }, {
    id: 'other_id',
    name: 'other_name',
    accountId: 'other_account_id',
    selectedVariationId: 'other_variation_id',
    variations: [{
      id: 'other_variation_id',
      name: 'other_variation_name',
      configuration: {
        series: 3,
        betweenSeriesTime: 70,
        repetitions: 8,
        repetitionTime: 3.8
      }
    }]
  }]
}

const makeLoadExercises = (): LoadExercises => {
  class LoadExercisesStub implements LoadExercises {
    async load (accountId: string): Promise<ExerciseModel[]> {
      return await new Promise(resolve => resolve(makeFakeExercises()))
    }
  }
  return new LoadExercisesStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accountId: 'any_id'
  }
})

interface SutTypes {
  sut: LoadExercisesController
  loadExercisesStub: LoadExercises
}

const makeSut = (): SutTypes => {
  const loadExercisesStub = makeLoadExercises()
  const sut = new LoadExercisesController(loadExercisesStub)
  return {
    sut,
    loadExercisesStub
  }
}

describe('LoadExercises Controller', () => {
  it('Should call LoadExercises with correct values', async () => {
    const { sut, loadExercisesStub } = makeSut()
    const loadSpy = jest.spyOn(loadExercisesStub, 'load')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.body.accountId)
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeExercises()))
  })

  it('Should return 204 if LoadExercises returns empty', async () => {
    const { sut, loadExercisesStub } = makeSut()
    jest.spyOn(loadExercisesStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if LoadExercises throws', async () => {
    const { sut, loadExercisesStub } = makeSut()
    jest.spyOn(loadExercisesStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
