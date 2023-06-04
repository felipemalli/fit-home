import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ExerciseModel } from '@/domain/models/exercises/exercise'
import { AddExerciseRepository } from '@/data/protocols/db/exercise/add-exercise-repository'
import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { UpdateExerciseRepository } from '@/data/usecases/exercise/update-exercise/db-update-exercise-protocols'
import { UpdateExerciseParams } from '@/domain/usecases/exercise/update-exercise'
import { CheckExerciseByIdRepository } from '@/data/usecases/exercise/check-exercise-by-id/db-check-exercise-by-id-protocols'

export class ExerciseMongoRepository implements AddExerciseRepository, LoadExercisesRepository, CheckExerciseByIdRepository, UpdateExerciseRepository {
  async add (exerciseData: AddExerciseRepository.Params): Promise<void> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { accountId, variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight, ...data } = exerciseData
    const exerciseModel = {
      ...data,
      accountId: MongoHelper.createObjectId(accountId),
      variations: [{
        _id: MongoHelper.createObjectId(),
        name: variationName,
        description: variationDescription,
        url: variationUrl,
        configuration: {
          series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight
        }
      }]
    }
    await exerciseCollection.insertOne(exerciseModel)
  }

  async loadAll (accountId: string): Promise<ExerciseModel[]> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const accountIdParsed = MongoHelper.createObjectId(accountId)
    const exercises = await exerciseCollection.find({ accountId: accountIdParsed }).toArray() as unknown as ExerciseModel[]
    return MongoHelper.mapCollection(exercises, 'variations')
  }

  async checkById (id: string): Promise<CheckExerciseByIdRepository.Result> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const exercise = await exerciseCollection.findOne({
      _id: MongoHelper.createObjectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return !!exercise
  }

  async update (id: string, data: UpdateExerciseParams): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const exercise = await exerciseCollection.findOneAndUpdate(
      { _id: MongoHelper.createObjectId(id) },
      { $set: data }, { returnDocument: 'after' }
    )
    return exercise && MongoHelper.map(exercise.value)
  }
}
