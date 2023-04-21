import { ExerciseVariation } from './exercise-variation'

export interface ExerciseCommon {
  name: string
  description?: string
  url?: string
  accountId: string
  variationSelected: number
  variations: ExerciseVariation[]
}
