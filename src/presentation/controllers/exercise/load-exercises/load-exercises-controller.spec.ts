import { LoadExercisesController } from './load-exercises-controller'
import { ExerciseModel, LoadExercises } from './load-exercises-protocols'

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

describe('LoadExercises Controller', () => {
  it('Should call LoadExercises', async () => {
    class LoadExercisesStub implements LoadExercises {
      async load (): Promise<ExerciseModel[]> {
        return await new Promise(resolve => resolve(makeFakeExercises()))
      }
    }
    const loadExercisesStub = new LoadExercisesStub()
    const loadSpy = jest.spyOn(loadExercisesStub, 'load')
    const sut = new LoadExercisesController(loadExercisesStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
