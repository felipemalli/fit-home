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

export const mockLoadExercises = (): LoadExercises => {
  class LoadExercisesStub implements LoadExercises {
    async load (accountId: string): Promise<ExerciseModel[]> {
      return await Promise.resolve(mockExerciseModels())
    }
  }
  return new LoadExercisesStub()
}

export const mockLoadExerciseById = (): LoadExerciseById => {
  class LoadExerciseByIdStub implements LoadExerciseById {
    async loadById (id: string): Promise<ExerciseModel | null> {
      return await Promise.resolve(mockExerciseModel())
    }
  }
  return new LoadExerciseByIdStub()
}

export const mockUpdateExercise = (): UpdateExercise => {
  class UpdateExerciseStub implements UpdateExercise {
    async update (id: string, data: UpdateExerciseRequestBody): Promise<ExerciseModel> {
      return await Promise.resolve(mockUpdateExerciseModel())
    }
  }
  return new UpdateExerciseStub()
}
