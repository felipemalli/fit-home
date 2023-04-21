export interface ExerciseConfiguration {
  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
  warmupTime: number
}

export interface ExerciseVariation {
  name: string
  configuration: ExerciseConfiguration
}
