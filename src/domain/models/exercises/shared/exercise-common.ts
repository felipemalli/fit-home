import { ExerciseVariation } from './exercise-variation'

export interface ExerciseCommon {
  name: string
  description?: string
  accountId: string
  selectedVariationId: string
  variations: ExerciseVariation[]
}
