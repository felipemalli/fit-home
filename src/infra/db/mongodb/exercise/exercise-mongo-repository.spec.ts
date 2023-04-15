import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { ExerciseMongoRepository } from './exercise-mongo-repository'

let exerciseCollection: Collection

describe('Exercise Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    exerciseCollection = await MongoHelper.getCollection('exercises')
    await exerciseCollection.deleteMany({})
  })

  const makeSut = (): ExerciseMongoRepository => {
    return new ExerciseMongoRepository()
  }

  it('Should return an exercise on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      description: 'any_description',
      url: 'https://www.any_url.com/',
      accountId: 'any_account_id',
      workoutId: 'any_workout_id',
      series: 1,
      betweenSeriesTime: 120,
      repetitions: 12,
      repetitionTime: 4.5
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.description).toBe('any_description')
    expect(account.url).toBe('https://www.any_url.com/')
    expect(account.configurations[0].series).toBe(1)
    expect(account.configurations[0].betweenSeriesTime).toBe(120)
    expect(account.configurations[0].repetitions).toBe(12)
    expect(account.configurations[0].repetitionTime).toBe(4.5)
  })
})
