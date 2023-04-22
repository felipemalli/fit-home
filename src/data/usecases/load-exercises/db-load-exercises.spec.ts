import { ExerciseModel } from '../../../domain/models/exercises/exercise'
import { LoadExercisesRepository } from '../../protocols/db/exercise/load-exercises-repository'
import { DbLoadExercises } from './db-load-exercises'

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

const makeLoadExercisesRepository = (): LoadExercisesRepository => {
  class LoadExercisesRepositoryStub implements LoadExercisesRepository {
    async loadAll (accountId: string): Promise<ExerciseModel[]> {
      return await new Promise(resolve => resolve(makeFakeExercises()))
    }
  }
  return new LoadExercisesRepositoryStub()
}

interface SutTypes {
  sut: DbLoadExercises
  loadExercisesRepositoryStub: LoadExercisesRepository
}

const makeSut = (): SutTypes => {
  const loadExercisesRepositoryStub = makeLoadExercisesRepository()
  const sut = new DbLoadExercises(loadExercisesRepositoryStub)
  return {
    sut,
    loadExercisesRepositoryStub
  }
}

describe('DbLoadExercises', () => {
  it('Should call LoadExercises with correct values', async () => {
    const { sut, loadExercisesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadExercisesRepositoryStub, 'loadAll')
    await sut.load('any_id')
    expect(loadAllSpy).toHaveBeenCalledWith('any_id')
  })
})
