import { ObjectId } from 'mongodb'
import { AddExerciseRepository } from '../../../../data/protocols/db/exercise/add-exercise-repository'
import { ExerciseModel } from '../../../../domain/models/exercises/exercise'
import { ExerciseVariation } from '../../../../domain/models/exercises/shared/exercise-variation'
import { AddExerciseModel } from '../../../../domain/usecases/add-exercise'
import { MongoHelper } from '../helpers/mongo-helper'

interface ExerciseVariationWithMongoId extends Omit<ExerciseVariation, 'id'> {
  _id: ObjectId
}
interface ExerciseModelWithoutId extends Omit<ExerciseModel, 'id' | 'variations'> {
  variations: ExerciseVariationWithMongoId[]
}

export class ExerciseMongoRepository implements AddExerciseRepository {
  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { variationName, variationDescription, variationUrl, series, betweenSeriesTime, repetitions, repetitionTime, warmupTime, weight, ...data } = exerciseData
    const exerciseModel: ExerciseModelWithoutId = {
      ...data,
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
    const exercise = await exerciseCollection.findOne({ _id: insertedId })
    return MongoHelper.map(exercise)
  }
}
