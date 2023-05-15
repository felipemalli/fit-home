export interface WorkoutModel {
  id: string
  accountId: string
  name: string
  description?: string
  weekdays?: string[]
  betweenExercisesTime: number
  exercises: Array<{
    exerciseId: string
    selectedVariationId: string
    order: number
  }>
}
