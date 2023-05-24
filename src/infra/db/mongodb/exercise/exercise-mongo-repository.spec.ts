import { ExerciseModelWithoutId, ExerciseMongoRepository } from './exercise-mongo-repository'
import { MongoHelper, Collection } from '../helpers/mongo-helper'
import { mockAddExerciseParams, mockExerciseModel, mockExerciseParams, mockExerciseVariationParams } from '@/domain/test'

let exerciseCollection: Collection
const ACCOUNT_ID = '6348acd2e1a47ca32e79f46f'

interface CreateExerciseTypes {
  id: string
  exerciseParameters: ExerciseModelWithoutId
}

const createExercise = async (): Promise<CreateExerciseTypes> => {
  const exerciseParameters = Object.assign({},
    mockExerciseParams(),
    { accountId: MongoHelper.createObjectId(ACCOUNT_ID) },
    {
      variations: [{
        _id: MongoHelper.createObjectId(),
        ...mockExerciseVariationParams()
      }]
    }
  )
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
      const exercise = await sut.add(Object.assign({},
        mockAddExerciseParams(),
        { accountId: ACCOUNT_ID }
      ))
      expect(exercise).toBeTruthy()
      expect(exercise.id).toBeTruthy()
      expect(exercise.accountId).toBeTruthy()
      expect(exercise.variations[0].id).toBeTruthy()
      const exerciseWithCorrectIds = mockExerciseModel()
      exerciseWithCorrectIds.id = exercise.id
      exerciseWithCorrectIds.accountId = exercise.accountId
      exerciseWithCorrectIds.variations[0].id = exercise.variations[0].id
      expect(exercise).toEqual(exerciseWithCorrectIds)
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
      expect(exercises[0].variations[0]).toEqual(firstExercise.variations[0])
      expect(exercises[1].variations[0]).toEqual(secondExercise.variations[0])
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
      expect(exercise?.id).toBeTruthy()
      expect(exercise?.name).toBe(exerciseParameters.name)
      expect(exercise?.description).toBe(exerciseParameters.description)
      expect(exercise?.isTemplate).toBe(exerciseParameters.isTemplate)
      expect(exercise?.variations[0]).toEqual(exerciseParameters.variations[0])
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
