import { AddExercise } from '@/domain/usecases/exercise/add-exercise'
import { CheckExerciseById } from '@/domain/usecases/exercise/check-exercise-by-id'
import { LoadExercises } from '@/domain/usecases/exercise/load-exercises'
import { UpdateExercise } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export class AddExerciseSpy implements AddExercise {
  params: AddExercise.Params

  async add (params: AddExercise.Params): Promise<void> {
    this.params = params
  }
}

export class LoadExercisesSpy implements LoadExercises {
  accountId: string
  result = mockExerciseModels()

  async load (accountId: string): Promise<LoadExercises.Result> {
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
  updatedParams: UpdateExercise.Params
  result = mockUpdateExerciseModel()

  async update (id: string, updatedParams: UpdateExercise.Params): Promise<UpdateExercise.Result> {
    this.id = id
    this.updatedParams = updatedParams
    return this.result
  }
}
