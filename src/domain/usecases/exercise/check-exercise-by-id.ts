export interface CheckExerciseById {
  checkById: (id: string) => Promise<CheckExerciseById.Result>
}

export namespace CheckExerciseById {
  export type Result = boolean
}
