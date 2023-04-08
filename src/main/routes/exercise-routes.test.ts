import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let exerciseCollection: Collection

describe('Exercise Routes', () => {
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

  describe('POST /exercises', () => {
    it('Should return 200 on add exercise success', async () => {
      await request(app)
        .post('/api/exercises')
        .send({
          name: 'Arm Flexion',
          series: 3,
          betweenSeriesTime: 80,
          repetitions: 10,
          repetitionTime: 2.35
        })
        .expect(201)
    })
  })
})
