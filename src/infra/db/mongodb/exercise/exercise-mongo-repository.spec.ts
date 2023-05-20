import { ExerciseModelWithoutId, ExerciseMongoRepository } from './exercise-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection, ObjectId } from 'mongodb'

let exerciseCollection: Collection
const ACCOUNT_ID = '6348acd2e1a47ca32e79f46f'

interface CreateExerciseTypes {
  id: string
  exerciseParameters: ExerciseModelWithoutId
}

const createExercise = async (): Promise<CreateExerciseTypes> => {
  const exerciseParameters = {
    _id: new ObjectId(),
    name: 'any_name',
    description: 'any_description',
    accountId: new ObjectId(ACCOUNT_ID),
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
  }
  const { insertedId } = await exerciseCollection.insertOne(exerciseParameters)
  return {
    id: insertedId.toString(),
    exerciseParameters
  }
}

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
    it('Should load an exercise by id on success', async () => {
      const { id, exerciseParameters } = await createExercise()
      const sut = makeSut()
      const exercise = await sut.loadById(id)
      expect(exercise).toBeTruthy()
      expect(exercise.id).toBeTruthy()
      expect(exercise.name).toBe(exerciseParameters.name)
      expect(exercise.variations[0].name).toBe(exerciseParameters.variations[0].name)
      expect(exercise.variations[0].configuration.repetitions).toBe(exerciseParameters.variations[0].configuration.repetitions)
    })
  })

  describe('update()', () => {
    it('Should update an exercise by id on success', async () => {
      const { id: firstId } = await createExercise()
      const sut = makeSut()
      const firstExercise = await sut.update(firstId, {
        name: 'updated_name',
        description: 'updated_description',
        isTemplate: false
      })
      expect(firstExercise).toBeTruthy()
      expect(firstExercise.id).toBeTruthy()
      expect(firstExercise.name).toBe('updated_name')
      expect(firstExercise.description).toBe('updated_description')
      expect(firstExercise.isTemplate).toBeFalsy()
      const { id: secondId } = await createExercise()
      const secondExercise = await sut.update(secondId, {
        name: 'updated_name'
      })
      expect(secondExercise.name).toBe('updated_name')
      expect(secondExercise.description).toBe('any_description')
      expect(secondExercise.isTemplate).toBeTruthy()
    })
  })
})
