import { MongoHelper } from '../helpers/mongo-helper'
import { ExerciseModel, ExerciseVariation } from '@/domain/models/exercises/exercise'
import { AddExerciseModel } from '@/domain/usecases/add-exercise'
import { AddExerciseRepository } from '@/data/protocols/db/exercise/add-exercise-repository'
import { LoadExercisesRepository } from '@/data/protocols/db/exercise/load-exercises-repository'
import { LoadExerciseByIdRepository } from '@/data/usecases/load-exercise-by-id/db-load-exercise-by-id-protocols'
import { ObjectId } from 'mongodb'

interface ExerciseVariationWithMongoId extends Omit<ExerciseVariation, 'id'> {
  _id: ObjectId
}
interface ExerciseModelWithoutId extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'> {
  accountId: ObjectId
  variations: ExerciseVariationWithMongoId[]
}

export class ExerciseMongoRepository implements AddExerciseRepository, LoadExercisesRepository, LoadExerciseByIdRepository {
  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { accountId, variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight, ...data } = exerciseData
    const exerciseModel: ExerciseModelWithoutId = {
      ...data,
      accountId: MongoHelper.parseToObjectId(accountId),
      variations: [{
        _id: new ObjectId(),
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
    exercise.variations = MongoHelper.mapArray(exercise.variations)
    return MongoHelper.map(exercise)
  }

  async loadAll (accountId: string): Promise<ExerciseModel[]> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const accountIdParsed = MongoHelper.parseToObjectId(accountId)
    const exercises = await exerciseCollection.find({ accountId: accountIdParsed }).toArray() as unknown as ExerciseModel[]
    for (let i = 0; i < exercises.length; i++) {
      exercises[i] = MongoHelper.map(exercises[i])
      exercises[i].variations = MongoHelper.mapArray(exercises[i].variations)
    }
    return exercises
  }

  async loadById (id: string): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const exercise = await exerciseCollection.findOne({ _id: MongoHelper.parseToObjectId(id) })
    return MongoHelper.map(exercise)
  }
}
