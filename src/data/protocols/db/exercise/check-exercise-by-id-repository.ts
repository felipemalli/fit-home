export interface CheckExerciseByIdRepository {
  checkById: (id: string) => Promise<CheckExerciseByIdRepository.Result>
}

export namespace CheckExerciseByIdRepository {
  export type Result = boolean
}
