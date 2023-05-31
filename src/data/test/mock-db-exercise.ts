import { AddExerciseRepository } from '@/data/protocols/db/exercise/add-exercise-repository'
import { LoadExerciseByIdRepository } from '@/data/protocols/db/exercise/load-exercise-by-id-repository'
import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { UpdateExerciseRepository } from '@/data/protocols/db/exercise/update-exercise-repository'
import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { AddExerciseParams } from '@/domain/usecases/exercise/add-exercise'
import { UpdateExerciseParams } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModel, mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export class AddExerciseRepositorySpy implements AddExerciseRepository {
  params: AddExerciseParams
  result = mockExerciseModel()

  async add (params: AddExerciseParams): Promise<ExerciseModel> {
    this.params = params
    return this.result
  }
}

export class LoadExerciseByIdRepositorySpy implements LoadExerciseByIdRepository {
  id: string
  result = mockExerciseModel()

  async loadById (id: string): Promise<ExerciseModel> {
    this.id = id
    return this.result
  }
}

export const mockLoadExercisesRepository = (): LoadExercisesRepository => {
  class LoadExercisesRepositoryStub implements LoadExercisesRepository {
    async loadAll (accountId: string): Promise<ExerciseModel[]> {
      return await Promise.resolve(mockExerciseModels())
    }
  }
  return new LoadExercisesRepositoryStub()
}

export class LoadExercisesRepositorySpy implements LoadExercisesRepository {
  accountId: string
  result = mockExerciseModels()

  async loadAll (accountId: string): Promise<ExerciseModel[]> {
    this.accountId = accountId
    return this.result
  }
}

export const mockUpdateExerciseRepository = (): UpdateExerciseRepository => {
  class UpdateExerciseRepositoryStub implements UpdateExerciseRepository {
    async update (id: string, data: UpdateExerciseParams): Promise<ExerciseModel> {
      return await Promise.resolve(mockUpdateExerciseModel())
    }
  }
  return new UpdateExerciseRepositoryStub()
}

export class UpdateExerciseRepositorySpy implements UpdateExerciseRepository {
  id: string
  updateData: UpdateExerciseParams
  result = mockUpdateExerciseModel()

  async update (id: string, updateData: UpdateExerciseParams): Promise<ExerciseModel> {
    this.id = id
    this.updateData = updateData
    return this.result
  }
}
