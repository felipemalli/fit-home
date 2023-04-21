export interface ExerciseConfiguration {
  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
  warmupTime: number
  weight?: number
}

export interface ExerciseVariation {
  id: string
  name: string
  description?: string
  url?: string
  configuration: ExerciseConfiguration
}
