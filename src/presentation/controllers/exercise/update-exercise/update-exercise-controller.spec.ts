import { UpdateExerciseController } from './update-exercise-controller'
import { ExerciseModel, HttpRequest, LoadExerciseById } from './update-exercise-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
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

const makeLoadExerciseById = (): LoadExerciseById => {
  class LoadExerciseByIdStub implements LoadExerciseById {
    async loadById (id: string): Promise<ExerciseModel | null> {
      return await new Promise(resolve => resolve(makeFakeExercise()))
    }
  }
  return new LoadExerciseByIdStub()
}

interface SutTypes {
  sut: UpdateExerciseController
  loadExerciseByIdStub: LoadExerciseById
}

const makeSut = (): SutTypes => {
  const loadExerciseByIdStub = makeLoadExerciseById()
  const sut = new UpdateExerciseController(loadExerciseByIdStub)
  return {
    sut,
    loadExerciseByIdStub
  }
}

describe('UpdateExercise Controller', () => {
  it('Should call LoadExerciseById with correct values', async () => {
    const { sut, loadExerciseByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadExerciseByIdStub, 'loadById')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.params.exerciseId)
  })
})
