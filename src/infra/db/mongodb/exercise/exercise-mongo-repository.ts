import { AddExerciseRepository } from '../../../../data/protocols/db/exercise/add-exercise-repository'
import { ExerciseModel } from '../../../../domain/models/exercises/exercise'
import { AddExerciseModel } from '../../../../domain/usecases/add-exercise'
import { MongoHelper } from '../helpers/mongo-helper'

export class ExerciseMongoRepository implements AddExerciseRepository {
  async add (exerciseData: AddExerciseModel): Promise<ExerciseModel> {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    const { configuration, ...data } = exerciseData
    const exerciseModel: Omit<ExerciseModel, 'id'> = {
      ...data,
      description: data.description ?? '',
      url: data.url ?? '',
      configurations: [configuration],
      isFavorite: false
    }
    const { insertedId } = await exerciseCollection.insertOne(exerciseModel)
    const exercise = await exerciseCollection.findOne({ _id: insertedId })
    return MongoHelper.map(exercise)
  }
}
