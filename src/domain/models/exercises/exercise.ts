export interface ExerciseModel {
  id: string
  name: string
  description?: string
  accountId: string
  isTemplate?: boolean
  variations: ExerciseVariation[]
}

export interface ExerciseVariation {
  id: string
  name: string
  description?: string
  url?: string
  configuration: ExerciseConfiguration
}

export interface ExerciseConfiguration {
  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
  warmupTime?: number
  weight?: number
}
