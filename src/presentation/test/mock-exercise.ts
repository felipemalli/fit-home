import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { AddExercise, AddExerciseParams } from '@/domain/usecases/exercise/add-exercise'
import { LoadExerciseById } from '@/domain/usecases/exercise/load-exercise-by-id'
import { LoadExercises } from '@/domain/usecases/exercise/load-exercises'
import { UpdateExercise, UpdateExerciseRequestBody } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModel, mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export class AddExerciseSpy implements AddExercise {
  params: AddExerciseParams
  result = mockExerciseModel()

  async add (params: AddExerciseParams): Promise<ExerciseModel> {
    this.params = params
    return this.result
  }
}

export class LoadExercisesSpy implements LoadExercises {
  accountId: string
  result = mockExerciseModels()

  async load (accountId: string): Promise<ExerciseModel[]> {
    this.accountId = accountId
    return this.result
  }
}

export class LoadExerciseByIdSpy implements LoadExerciseById {
  id: string
  result: ExerciseModel | null = mockExerciseModel()

  async loadById (id: string): Promise<ExerciseModel | null> {
    this.id = id
    return this.result
  }
}

export class UpdateExerciseSpy implements UpdateExercise {
  id: string
  updatedParams: UpdateExerciseRequestBody
  result = mockUpdateExerciseModel()

  async update (id: string, updatedParams: UpdateExerciseRequestBody): Promise<ExerciseModel> {
    this.id = id
    this.updatedParams = updatedParams
    return this.result
  }
}
