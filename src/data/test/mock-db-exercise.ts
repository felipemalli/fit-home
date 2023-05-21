import { AddExerciseRepository } from '@/data/protocols/db/exercise/add-exercise-repository'
import { LoadExerciseByIdRepository } from '@/data/protocols/db/exercise/load-exercise-by-id-repository'
import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { UpdateExerciseRepository } from '@/data/protocols/db/exercise/update-exercise-repository'
import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { AddExerciseParams } from '@/domain/usecases/exercise/add-exercise'
import { UpdateExerciseParams } from '@/domain/usecases/exercise/update-exercise'
import { mockExerciseModel, mockExerciseModels, mockUpdateExerciseModel } from '@/domain/test'

export const mockAddExerciseRepository = (): AddExerciseRepository => {
  class AddExerciseRepositoryStub implements AddExerciseRepository {
    async add (exerciseData: AddExerciseParams): Promise<ExerciseModel> {
      return await Promise.resolve(mockExerciseModel())
    }
  }
  return new AddExerciseRepositoryStub()
}

export const mockLoadExerciseByIdRepository = (): LoadExerciseByIdRepository => {
  class LoadExerciseByIdRepositoryStub implements LoadExerciseByIdRepository {
    async loadById (id: string): Promise<ExerciseModel> {
      return await Promise.resolve(mockExerciseModel())
    }
  }
  return new LoadExerciseByIdRepositoryStub()
}

export const mockLoadExercisesRepository = (): LoadExercisesRepository => {
  class LoadExercisesRepositoryStub implements LoadExercisesRepository {
    async loadAll (accountId: string): Promise<ExerciseModel[]> {
      return await Promise.resolve(mockExerciseModels())
    }
  }
  return new LoadExercisesRepositoryStub()
}

export const mockUpdateExerciseRepository = (): UpdateExerciseRepository => {
  class UpdateExerciseRepositoryStub implements UpdateExerciseRepository {
    async update (id: string, data: UpdateExerciseParams): Promise<ExerciseModel> {
      return await Promise.resolve(mockUpdateExerciseModel())
    }
  }
  return new UpdateExerciseRepositoryStub()
}
