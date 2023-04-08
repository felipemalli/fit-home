import { AddExerciseRepository } from '../../../../data/protocols/db/exercise/add-exercise-repository'
import { ExerciseModel } from '../../../../domain/models/exercise'
import { AddExerciseModel } from '../../../../domain/usecases/add-exercise'
import { MongoHelper } from '../helpers/mongo-helper'

export class ExerciseMongoRepository implements AddExerciseRepository {
  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { insertedId } = await exerciseCollection.insertOne(exerciseData)
    const exercise = await exerciseCollection.findOne({ _id: insertedId })
    return MongoHelper.map(exercise)
  }
}
