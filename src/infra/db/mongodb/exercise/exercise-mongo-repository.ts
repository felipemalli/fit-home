import { MongoHelper, ObjectId } from '../helpers/mongo-helper'
import { ExerciseModel, ExerciseVariation } from '@/domain/models/exercises/exercise'
import { AddExerciseModel } from '@/domain/usecases/exercise/add-exercise'
import { AddExerciseRepository } from '@/data/protocols/db/exercise/add-exercise-repository'
import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { LoadExerciseByIdRepository } from '@/data/usecases/exercise/load-exercise-by-id/db-load-exercise-by-id-protocols'
import { UpdateExerciseRepository } from '@/data/usecases/exercise/update-exercise/db-update-exercise-protocols'
import { UpdateExerciseModel } from '@/domain/usecases/exercise/update-exercise'

interface ExerciseVariationWithMongoId extends Omit<ExerciseVariation, 'id'> {
  _id: ObjectId
}
export interface ExerciseModelWithoutId extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'> {
  accountId: ObjectId
  variations: ExerciseVariationWithMongoId[]
}

export class ExerciseMongoRepository implements AddExerciseRepository, LoadExercisesRepository, LoadExerciseByIdRepository, UpdateExerciseRepository {
  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { accountId, variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight, ...data } = exerciseData
    const exerciseModel: ExerciseModelWithoutId = {
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
    const { insertedId } = await exerciseCollection.insertOne(exerciseModel)
    const exercise = await exerciseCollection.findOne({ _id: insertedId }) as unknown as ExerciseModel
    exercise.variations = MongoHelper.mapCollection(exercise.variations)
    return MongoHelper.map(exercise)
  }

  async loadAll (accountId: string): Promise<ExerciseModel[]> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const accountIdParsed = MongoHelper.createObjectId(accountId)
    const exercises = await exerciseCollection.find({ accountId: accountIdParsed }).toArray() as unknown as ExerciseModel[]
    return MongoHelper.mapCollection(exercises, 'variations')
  }

  async loadById (id: string): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const exercise = await exerciseCollection.findOne({ _id: MongoHelper.createObjectId(id) })
    return exercise && MongoHelper.map(exercise)
  }

  async update (id: string, data: UpdateExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const exercise = await exerciseCollection.findOneAndUpdate(
      { _id: MongoHelper.createObjectId(id) },
      { $set: data }, { returnDocument: 'after' }
    )
    return exercise && MongoHelper.map(exercise.value)
  }
}
