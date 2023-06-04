import { ExerciseMongoRepository } from './exercise-mongo-repository'
import { MongoHelper, Collection, ObjectId } from '../helpers/mongo-helper'
import { mockAddExerciseParams, mockExerciseParams, mockExerciseVariationParams } from '@/domain/test'
import { ExerciseModel, ExerciseVariation } from '@/domain/models/exercises/exercise'

interface ExerciseVariationWithMongoId extends Omit<ExerciseVariation, 'id'> {
  _id: ObjectId
}

export interface ExerciseModelWithoutId extends Omit<ExerciseModel, 'id' | 'accountId' | 'variations'> {
  accountId: ObjectId
  variations: ExerciseVariationWithMongoId[]
}

interface CreateExerciseTypes {
  id: string
  exerciseParameters: ExerciseModelWithoutId
}

const createExercise = async (): Promise<CreateExerciseTypes> => {
  const exerciseParameters = {
    ...mockExerciseParams(),
    accountId: MongoHelper.createObjectId(ACCOUNT_ID),
    variations: [{
      _id: MongoHelper.createObjectId(),
      ...mockExerciseVariationParams()
    }]
  }
  const { insertedId } = await exerciseCollection.insertOne(exerciseParameters)
  return {
    id: insertedId.toString(),
    exerciseParameters
  }
}

const createExercises = async (): Promise<ExerciseModelWithoutId[]> => {
  const { exerciseParameters: firstExerciseParameters } = await createExercise()
  const { exerciseParameters: secondExerciseParameters } = await createExercise()
  return [
    firstExerciseParameters,
    secondExerciseParameters
  ]
}

const makeSut = (): ExerciseMongoRepository => {
  return new ExerciseMongoRepository()
}

let exerciseCollection: Collection
const ACCOUNT_ID = '6348acd2e1a47ca32e79f46f'

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
      const addExerciseParams = mockAddExerciseParams()
      await sut.add({
        ...addExerciseParams,
        accountId: ACCOUNT_ID
      })
      const exercise = await exerciseCollection.findOne({ accountId: MongoHelper.createObjectId(ACCOUNT_ID) })
      expect(exercise).toBeTruthy()
      expect(exercise?.accountId).toBeTruthy()
      expect(exercise?.name).toBe(addExerciseParams.name)
      expect(exercise?.variations[0]).toBeTruthy()
      expect(exercise?.accountId).toEqual(MongoHelper.createObjectId(ACCOUNT_ID))
    })
  })

  describe('loadAll()', () => {
    it('Should load all exercises by account on success', async () => {
      const [firstExercise, secondExercise] = await createExercises()
      const sut = makeSut()
      const exercises = await sut.loadAll(ACCOUNT_ID)
      expect(exercises.length).toBe(2)
      expect(exercises[0]).toBeTruthy()
      expect(exercises[0].id).toBeTruthy()
      expect(exercises[0].name).toBe(firstExercise.name)
      expect(exercises[0].description).toBe(firstExercise.description)
      expect(exercises[0].isTemplate).toBe(firstExercise.isTemplate)
      expect(exercises[0].variations[0].id).toBeTruthy()
      const { _id: firstId, ...firstVariation } = firstExercise.variations[0]
      const { _id: secondId, ...secondVariation } = secondExercise.variations[0]
      expect(exercises[0].variations[0]).toEqual(expect.objectContaining(firstVariation))
      expect(exercises[1].variations[0]).toEqual(expect.objectContaining(secondVariation))
    })

    it('Should load empty list with no exercises on the accountId', async () => {
      const sut = makeSut()
      const exercises = await sut.loadAll(ACCOUNT_ID)
      expect(exercises.length).toBe(0)
    })
  })

  describe('checkById()', () => {
    it('Should return true if exercise exists', async () => {
      const { id } = await createExercise()
      const sut = makeSut()
      const exists = await sut.checkById(id)
      expect(exists).toBeTruthy()
    })

    it('Should return false if there is no exercise', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(MongoHelper.createObjectId().toString())
      expect(exists).toBeFalsy()
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
