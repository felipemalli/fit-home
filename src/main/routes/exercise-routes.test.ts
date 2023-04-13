import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let exerciseCollection: Collection
let accountCollection: Collection

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /exercises', () => {
    it('Should return 403 on add exercise without accessToken', async () => {
      await request(app)
        .post('/api/exercises')
        .send({
          name: 'Push-up',
          description: 'Do half classic and half triangle push-up.',
          url: 'https://www.youtube.com/watch?v=IODxDxX7oi4&ab_channel=Calisthenicmovement',
          series: 3,
          betweenSeriesTime: 80,
          repetitions: 10,
          repetitionTime: 2.35
        })
        .expect(403)
    })

    it('Should return 201 on add exercise with valid accessToken', async () => {
      const { insertedId } = await accountCollection.insertOne({
        name: 'Felipe',
        email: 'felipe@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = insertedId.toString()
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: insertedId
      },
      {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/exercises')
        .set('x-access-token', accessToken)
        .send({
          name: 'Arm Flexion',
          description: 'Do half classic and half triangle push-up.',
          url: 'https://www.youtube.com/watch?v=IODxDxX7oi4&ab_channel=Calisthenicmovement',
          series: 3,
          betweenSeriesTime: 80,
          repetitions: 10,
          repetitionTime: 2.35
        })
        .expect(201)
    })
  })
})
