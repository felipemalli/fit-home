import { ObjectId } from 'mongodb'
import { AddExerciseRepository } from '../../../../data/protocols/db/exercise/add-exercise-repository'
import { LoadExercisesRepository } from '../../../../data/protocols/db/exercise/load-exercises-repository'
import { ExerciseModel } from '../../../../domain/models/exercises/exercise'
import { ExerciseVariation } from '../../../../domain/models/exercises/shared/exercise-variation'
import { AddExerciseModel } from '../../../../domain/usecases/add-exercise'
import { MongoHelper } from '../helpers/mongo-helper'

interface ExerciseVariationWithMongoId extends Omit<ExerciseVariation, 'id'> {
  _id: ObjectId
}
interface ExerciseModelWithoutId extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'> {
  accountId: ObjectId
  variations: ExerciseVariationWithMongoId[]
}

export class ExerciseMongoRepository implements AddExerciseRepository, LoadExercisesRepository {
  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { accountId, variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight, ...data } = exerciseData
    const exerciseModel: ExerciseModelWithoutId = {
      ...data,
      accountId: MongoHelper.parseToObjectId(accountId),
      selectedVariationId: '',
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
    await exerciseCollection.updateOne({ _id: insertedId }, {
      $set: { selectedVariationId: exerciseModel.variations[0]._id }
    })
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
}
