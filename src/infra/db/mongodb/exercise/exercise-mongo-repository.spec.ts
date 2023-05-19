import { ExerciseMongoRepository } from './exercise-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'

let exerciseCollection: Collection
const ACCOUNT_ID = '6348acd2e1a47ca32e79f46f'

const makeSut = (): ExerciseMongoRepository => {
  return new ExerciseMongoRepository()
}

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

  describe('add()', () => {
    it('Should return an exercise on add success', async () => {
      const sut = makeSut()
      const exercise = await sut.add({
        name: 'any_name',
        description: 'any_description',
        accountId: ACCOUNT_ID,
        isTemplate: true,
        variationName: 'any_variation_name',
        variationDescription: 'any_variation_description',
        variationUrl: 'https://www.any_variation_url.com/',
        series: 1,
        betweenSeriesTime: 120,
        repetitions: 12,
        repetitionTime: 4.5,
        warmupTime: 0,
        weight: 10
      })
      expect(exercise).toBeTruthy()
      expect(exercise.id).toBeTruthy()
      expect(exercise.name).toBe('any_name')
      expect(exercise.description).toBe('any_description')
      expect(exercise.isTemplate).toBeTruthy()
      const { variations: [firstVariation] } = exercise
      expect(firstVariation.name).toBe('any_variation_name')
      expect(firstVariation.description).toBe('any_variation_description')
      expect(firstVariation.url).toBe('https://www.any_variation_url.com/')
      expect(firstVariation.configuration.series).toBe(1)
      expect(firstVariation.configuration.betweenSeriesTime).toBe(120)
      expect(firstVariation.configuration.repetitions).toBe(12)
      expect(firstVariation.configuration.repetitionTime).toBe(4.5)
      expect(firstVariation.configuration.warmupTime).toBe(0)
      expect(firstVariation.configuration.weight).toBe(10)
    })
  })

  describe('loadAll()', () => {
    it('Should load all exercises by account on success', async () => {
      const accountId = new ObjectId(ACCOUNT_ID)
      await exerciseCollection.insertMany([{
        _id: new ObjectId(),
        name: 'any_name',
        description: 'any_description',
        accountId,
        isTemplate: true,
        variations: [{
          _id: new ObjectId(),
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
      }, {
        _id: new ObjectId(),
        name: 'other_name',
        accountId,
        isTemplate: false,
        variations: [{
          _id: new ObjectId(),
          name: 'other_variation_name',
          configuration: {
            series: 3,
            betweenSeriesTime: 70,
            repetitions: 8,
            repetitionTime: 3.8
          }
        }]
      }])
      const sut = makeSut()
      const exercises = await sut.loadAll(ACCOUNT_ID)
      expect(exercises.length).toBe(2)
      expect(exercises[0]).toBeTruthy()
      expect(exercises[0].id).toBeTruthy()
      expect(exercises[0].name).toBe('any_name')
      expect(exercises[0].description).toBe('any_description')
      expect(exercises[0].isTemplate).toBeTruthy()
      const { variations: [firstVariation] } = exercises[0]
      expect(firstVariation.name).toBe('any_variation_name')
      expect(firstVariation.description).toBe('any_variation_description')
      expect(firstVariation.url).toBe('https://www.any_variation_url.com/')
      expect(firstVariation.configuration.series).toBe(1)
      expect(firstVariation.configuration.betweenSeriesTime).toBe(120)
      expect(firstVariation.configuration.repetitions).toBe(12)
      expect(firstVariation.configuration.repetitionTime).toBe(4.5)
      expect(firstVariation.configuration.warmupTime).toBe(0)
      expect(firstVariation.configuration.weight).toBe(10)
      expect(exercises[1].name).toBe('other_name')
    })

    it('Should load empty list with no exercises on the accountId', async () => {
      const sut = makeSut()
      const exercises = await sut.loadAll(ACCOUNT_ID)
      expect(exercises.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('Should load exercise by id on success', async () => {
      const firstVariationId = new ObjectId()
      const accountId = new ObjectId(ACCOUNT_ID)
      const { insertedId } = await exerciseCollection.insertOne({
        _id: new ObjectId(),
        name: 'any_name',
        description: 'any_description',
        accountId,
        isTemplate: true,
        variations: [{
          _id: firstVariationId,
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
      const sut = makeSut()
      const exercise = await sut.loadById(insertedId.toString())
      expect(exercise).toBeTruthy()
      expect(exercise.name).toBe('any_name')
      expect(exercise.variations[0].name).toBe('any_variation_name')
      expect(exercise.variations[0].configuration.repetitions).toBe(12)
    })
  })
})
