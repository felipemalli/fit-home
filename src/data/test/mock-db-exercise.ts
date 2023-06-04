import { AddExerciseRepository } from '@/data/protocols/db/exercise/add-exercise-repository'
import { CheckExerciseByIdRepository } from '@/data/protocols/db/exercise/load-exercise-by-id-repository'
import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { UpdateExerciseRepository } from '@/data/protocols/db/exercise/update-exercise-repository'
import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { UpdateExerciseParams } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModel, mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export class AddExerciseRepositorySpy implements AddExerciseRepository {
  params: AddExerciseRepository.Params
  result = mockExerciseModel()

  async add (params: AddExerciseRepository.Params): Promise<AddExerciseRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckExerciseByIdRepositorySpy implements CheckExerciseByIdRepository {
  id: string
  result = true

  async checkById (id: string): Promise<CheckExerciseByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadExercisesRepositorySpy implements LoadExercisesRepository {
  accountId: string
  result = mockExerciseModels()

  async loadAll (accountId: string): Promise<ExerciseModel[]> {
    this.accountId = accountId
    return this.result
  }
}

export class UpdateExerciseRepositorySpy implements UpdateExerciseRepository {
  id: string
  updatedParams: UpdateExerciseParams
  result = mockUpdateExerciseModel()

  async update (id: string, updateData: UpdateExerciseParams): Promise<ExerciseModel> {
    this.id = id
    this.updatedParams = updateData
    return this.result
  }
}
