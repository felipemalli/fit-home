export interface WorkoutModel {
  id: string
  accountId: string
  name: string
  description?: string
  weekdays?: string[]
  betweenExercisesTime: number
}
