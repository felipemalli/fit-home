import { ExerciseConfiguration } from './exercise-configuration'

export interface ExerciseCommon {
  name: string
  description?: string
  url?: string
  accountId: string
  configurations: ExerciseConfiguration[]
}
