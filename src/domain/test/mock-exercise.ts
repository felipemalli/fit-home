import { ExerciseConfiguration, ExerciseModel, ExerciseVariation } from '@/domain/models/exercises/exercise'
import { UpdateExercise } from '@/domain/usecases/exercise/update-exercise'
import { AddExercise } from '../usecases/exercise/add-exercise'

const mockExerciseConfiguration = (): ExerciseConfiguration => ({
  series: 1,
  betweenSeriesTime: 120,
  repetitions: 12,
  repetitionTime: 4.5,
  warmupTime: 0,
  weight: 10
})

export const mockExerciseVariationParams = (): Omit<ExerciseVariation, 'id'> => ({
  name: 'any_variation_name',
  description: 'any_variation_description',
  url: 'https://www.any_variation_url.com/',
  configuration: mockExerciseConfiguration()
})

export const mockExerciseParams = (): Omit<ExerciseModel, 'id' | 'variations'> => ({
  name: 'any_name',
  description: 'any_description',
  accountId: 'any_account_id',
  isTemplate: true
})

export const mockExerciseModel = (): ExerciseModel => ({
  ...mockExerciseParams(),
  id: 'any_id',
  variations: [{
    id: 'any_variation_id',
    ...mockExerciseVariationParams()
  }]
})

export const mockAddExerciseParams = (): AddExercise.Params => ({
  ...mockExerciseParams(),
  ...mockExerciseConfiguration(),
  variationName: 'any_variation_name',
  variationDescription: 'any_variation_description',
  variationUrl: 'https://www.any_variation_url.com/'
})

export const mockUpdateExerciseParams = (): UpdateExercise.Params => ({
  name: 'updated_name',
  description: 'updated_description',
  isTemplate: true
})

export const mockUpdateExerciseModel = (): ExerciseModel => ({ ...mockUpdateExerciseParams(), ...mockExerciseModel() })

const mockRequiredFieldsExerciseModel = (): ExerciseModel => {
  return {
    id: 'other_id',
    name: 'other_name',
    accountId: 'other_account_id',
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
  }
}

export const mockExerciseModels = (): ExerciseModel[] => {
  return [
    mockExerciseModel(),
    mockRequiredFieldsExerciseModel()
  ]
}
