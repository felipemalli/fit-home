import { UpdateExerciseController } from './update-exercise-controller'
import { ExerciseModel, HttpRequest, LoadExerciseById, UpdateExercise, UpdateExerciseBody, UpdateExerciseParams } from './update-exercise-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest<UpdateExerciseBody, UpdateExerciseParams> => ({
  body: {
    name: 'updated_name',
    description: 'updated_description',
    isTemplate: false
  },
  params: {
    exerciseId: 'any_exercise_id'
  }
})

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

const makeFakeUpdatedExercise = (): ExerciseModel => ({
  id: 'any_id',
  name: 'updated_name',
  description: 'updated_description',
  accountId: 'any_account_id',
  isTemplate: false,
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

const makeLoadExerciseById = (): LoadExerciseById => {
  class LoadExerciseByIdStub implements LoadExerciseById {
    async loadById (id: string): Promise<ExerciseModel | null> {
      return await new Promise(resolve => resolve(makeFakeExercise()))
    }
  }
  return new LoadExerciseByIdStub()
}

const makeUpdateExercise = (): UpdateExercise => {
  class UpdateExerciseStub implements UpdateExercise {
    async update (id: string, data: UpdateExerciseBody): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(makeFakeUpdatedExercise()))
    }
  }
  return new UpdateExerciseStub()
}

interface SutTypes {
  sut: UpdateExerciseController
  loadExerciseByIdStub: LoadExerciseById
  updateExerciseStub: UpdateExercise
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdStub = makeLoadExerciseById()
  const updateExerciseStub = makeUpdateExercise()
  const sut = new UpdateExerciseController(loadExerciseByIdStub, updateExerciseStub)
  return {
    sut,
    loadExerciseByIdStub,
    updateExerciseStub
  }
}

describe('UpdateExercise Controller', () => {
  it('Should call LoadExerciseById with correct values', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadExerciseByIdStub, 'loadById')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.params?.exerciseId)
  })

  it('Should return 403 if LoadExerciseById returns null', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    jest.spyOn(loadExerciseByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('exerciseId')))
  })

  it('Should return 500 if LoadExerciseById throws', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    jest.spyOn(loadExerciseByIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call SaveExercise with correct values', async () => {
    const { sut, updateExerciseStub } = makeSut()
    const updateSpy = jest.spyOn(updateExerciseStub, 'update')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith(httpRequest.params?.exerciseId, httpRequest.body)
  })

  it('Should return 500 if SaveExercise throws', async () => {
    const { sut, updateExerciseStub } = makeSut()
    jest.spyOn(updateExerciseStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUpdatedExercise()))
  })
})
