
import { DbUpdateExercise } from './db-update-exercise'
import { UpdateExerciseModel, ExerciseModel, UpdateExerciseRepository } from './db-update-exercise-protocols'

const makeFakeExerciseData = (): UpdateExerciseModel => ({
  name: 'updated_name',
  description: 'updated_description',
  isTemplate: true
})

const makeFakeExercise = (): ExerciseModel => Object.assign({}, makeFakeExerciseData() as Required<UpdateExerciseModel>, {
  id: 'any_id',
  accountId: 'any_account_id',
  variations: [{
    id: 'any_variation_id',
    name: 'any_variation_name',
    description: 'any_variation_description',
    url: 'https://www.any_variation_url.com/',
    configuration: {
      series: 1,
      betweenSeriesTime: 120,
      repetitions: 12,
      repetitionTime: 4.5,
      warmupTime: 0,
      weight: 10
    }
  }]
})

const makeUpdateExerciseRepository = (): UpdateExerciseRepository => {
  class UpdateExerciseRepositoryStub implements UpdateExerciseRepository {
    async update (data: UpdateExerciseModel): Promise<ExerciseModel> {
      return await new Promise(resolve => resolve(makeFakeExercise()))
    }
  }
  return new UpdateExerciseRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateExercise
  updateExerciseRepositoryStub: UpdateExerciseRepository
}

const makeSut = (): SutTypes => {
  const updateExerciseRepositoryStub = makeUpdateExerciseRepository()
  const sut = new DbUpdateExercise(updateExerciseRepositoryStub)
  return {
    sut,
    updateExerciseRepositoryStub
  }
}

describe('DbUpdateExercise UseCase', () => {
  it('Should call UpdateExerciseRepository with correct values', async () => {
    const { sut, updateExerciseRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateExerciseRepositoryStub, 'update')
    const exerciseData = makeFakeExerciseData()
    await sut.update(exerciseData)
    expect(updateSpy).toHaveBeenCalledWith(exerciseData)
  })

  it('Should throw if UpdateExerciseRepository throws', async () => {
    const { sut, updateExerciseRepositoryStub } = makeSut()
    jest.spyOn(updateExerciseRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeExerciseData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an Exercise on success', async () => {
    const { sut } = makeSut()
    const exercise = await sut.update(makeFakeExerciseData())
    expect(exercise).toEqual(makeFakeExercise())
  })
})
