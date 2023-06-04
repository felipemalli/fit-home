import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { AddExercise } from '@/domain/usecases/exercise/add-exercise'
import { CheckExerciseById } from '@/domain/usecases/exercise/check-exercise-by-id'
import { LoadExercises } from '@/domain/usecases/exercise/load-exercises'
import { UpdateExercise, UpdateExerciseRequestBody } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModel, mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export class AddExerciseSpy implements AddExercise {
  params: AddExercise.Params
  result = mockExerciseModel()

  async add (params: AddExercise.Params): Promise<ExerciseModel> {
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

export class CheckExerciseByIdSpy implements CheckExerciseById {
  id: string
  result = true

  async checkById (id: string): Promise<CheckExerciseById.Result> {
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
