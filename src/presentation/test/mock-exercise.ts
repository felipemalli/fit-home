import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { AddExercise, AddExerciseParams } from '@/domain/usecases/exercise/add-exercise'
import { LoadExerciseById } from '@/domain/usecases/exercise/load-exercise-by-id'
import { LoadExercises } from '@/domain/usecases/exercise/load-exercises'
import { UpdateExercise, UpdateExerciseRequestBody } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModel, mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export const mockAddExercise = (): AddExercise => {
  class AddExerciseStub implements AddExercise {
    async add (data: AddExerciseParams): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(mockExerciseModel()))
    }
  }
  return new AddExerciseStub()
}

export const mockLoadExercises = (): LoadExercises => {
  class LoadExercisesStub implements LoadExercises {
    async load (accountId: string): Promise<ExerciseModel[]> {
      return await new Promise(resolve => resolve(mockExerciseModels()))
    }
  }
  return new LoadExercisesStub()
}

export const mockLoadExerciseById = (): LoadExerciseById => {
  class LoadExerciseByIdStub implements LoadExerciseById {
    async loadById (id: string): Promise<ExerciseModel | null> {
      return await new Promise(resolve => resolve(mockExerciseModel()))
    }
  }
  return new LoadExerciseByIdStub()
}

export const mockUpdateExercise = (): UpdateExercise => {
  class UpdateExerciseStub implements UpdateExercise {
    async update (id: string, data: UpdateExerciseRequestBody): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(mockUpdateExerciseModel()))
    }
  }
  return new UpdateExerciseStub()
}
