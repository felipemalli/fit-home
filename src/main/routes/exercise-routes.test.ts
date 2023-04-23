import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let exerciseCollection: Collection
let accountCollection: Collection
const ACCOUNT_ID = '6348acd2e1a47ca32e79f46f'

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
      const accountId = new ObjectId(ACCOUNT_ID)
      await request(app)
        .post('/api/exercises')
        .send({
          name: 'Bench Press',
          description: 'Lying on the training chair',
          workoutId: '65334ikt04k03e45t4',
          templateId: 'ds3a76434plds334alpsd02',
          accountId,
          variationName: 'Standard',
          variationDescription: 'Do half weight in the last 2 repetitions',
          variationUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4&ab_channel=Calisthenicmovement',
          series: 3,
          betweenSeriesTime: 80,
          repetitions: 10,
          repetitionTime: 4.35,
          warmupTime: 30,
          weight: 12
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
          name: 'Bench Press',
          description: 'Lying on the training chair',
          workoutId: '65334ikt04k03e45t4',
          templateId: 'ds3a76434plds334alpsd02',
          accountId: ACCOUNT_ID,
          variationName: 'Standard',
          variationDescription: 'Do half weight in the last 2 repetitions',
          variationUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4&ab_channel=Calisthenicmovement',
          series: 3,
          betweenSeriesTime: 80,
          repetitions: 10,
          repetitionTime: 4.35,
          warmupTime: 30,
          weight: 12
        })
        .expect(201)
    })
  })

  describe('GET /exercises', () => {
    it('Should return 403 on load exercise without accessToken', async () => {
      await request(app)
        .get('/api/exercises')
        .expect(403)
    })
  })
})
