import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { ExerciseMongoRepository } from './exercise-mongo-repository'

let exerciseCollection: Collection

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
      const account = await sut.add({
        name: 'any_name',
        description: 'any_description',
        workoutId: 'any_workout_id',
        templateId: 'any_template_id',
        accountId: 'any_account_id',
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
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.description).toBe('any_description')
      expect(account.workoutId).toBe('any_workout_id')
      expect(account.templateId).toBe('any_template_id')
      expect(account.selectedVariationId).toBeTruthy()
      const { variations: [firstVariation] } = account
      expect(account.selectedVariationId.toString()).toBe(firstVariation.id)
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
      const firstVariationId = new ObjectId()
      const secondVariationId = new ObjectId()
      await exerciseCollection.insertMany([{
        _id: new ObjectId(),
        name: 'any_name',
        description: 'any_description',
        workoutId: 'any_workout_id',
        templateId: 'any_template_id',
        accountId: 'valid_account_id',
        selectedVariationId: firstVariationId,
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
      }, {
        _id: new ObjectId(),
        name: 'other_name',
        accountId: 'valid_account_id',
        selectedVariationId: secondVariationId,
        variations: [{
          _id: secondVariationId,
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
      const accounts = await sut.loadAll('valid_account_id')
      expect(accounts.length).toBe(2)
      expect(accounts[0]).toBeTruthy()
      expect(accounts[0].id).toBeTruthy()
      expect(accounts[0].name).toBe('any_name')
      expect(accounts[0].description).toBe('any_description')
      expect(accounts[0].workoutId).toBe('any_workout_id')
      expect(accounts[0].templateId).toBe('any_template_id')
      expect(accounts[0].selectedVariationId).toBeTruthy()
      const { variations: [firstVariation] } = accounts[0]
      expect(accounts[0].selectedVariationId.toString()).toBe(firstVariation.id)
      expect(firstVariation.name).toBe('any_variation_name')
      expect(firstVariation.description).toBe('any_variation_description')
      expect(firstVariation.url).toBe('https://www.any_variation_url.com/')
      expect(firstVariation.configuration.series).toBe(1)
      expect(firstVariation.configuration.betweenSeriesTime).toBe(120)
      expect(firstVariation.configuration.repetitions).toBe(12)
      expect(firstVariation.configuration.repetitionTime).toBe(4.5)
      expect(firstVariation.configuration.warmupTime).toBe(0)
      expect(firstVariation.configuration.weight).toBe(10)
      expect(accounts[1].name).toBe('other_name')
    })

    it('Should load empty list with no exercises on the accountId', async () => {
      const sut = makeSut()
      const accounts = await sut.loadAll('account_id')
      expect(accounts.length).toBe(0)
    })
  })
})
