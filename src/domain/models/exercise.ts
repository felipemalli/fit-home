export interface ExerciseModel {
  id: string
  name: string
  description?: string
  url?: string
  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
}
