import app from '#/main/config/app'
import env from '#/main/config/env'
import { MongoHelper, Collection, ObjectId } from '#/infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

let exerciseCollection: Collection
let accountCollection: Collection

const makeAccount = async (): Promise<ObjectId> => {
  const { insertedId } = await accountCollection.insertOne({
    name: 'Felipe',
    email: 'felipe@gmail.com',
    password: '123'
  })
  return insertedId
}

const makeAccessToken = async (insertedId: ObjectId): Promise<string> => {
  const id = insertedId.toString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    { _id: insertedId },
    { $set: { accessToken } }
  )
  return accessToken
}

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
      const insertedId = await makeAccount()
      await request(app)
        .post('/api/exercises')
        .send({
          name: 'Bench Press',
          description: 'Lying on the training chair',
          accountId: insertedId,
          isTemplate: true,
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
      const insertedId = await makeAccount()
      const accessToken = await makeAccessToken(insertedId)
      await request(app)
        .post('/api/exercises')
        .set('x-access-token', accessToken)
        .send({
          name: 'Bench Press',
          description: 'Lying on the training chair',
          accountId: insertedId,
          isTemplate: true,
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
        .expect(204)
    })
  })

  describe('GET /exercises', () => {
    it('Should return 403 on load exercise without accessToken', async () => {
      await request(app)
        .get('/api/exercises')
        .expect(403)
    })

    it('Should return 200 on load exercises with valid accessToken', async () => {
      const insertedId = await makeAccount()
      const accessToken = await makeAccessToken(insertedId)
      const firstVariationId = MongoHelper.createObjectId()
      await exerciseCollection.insertMany([{
        _id: MongoHelper.createObjectId(),
        name: 'any_name',
        description: 'any_description',
        accountId: insertedId,
        isTemplate: true,
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
      }])
      await request(app)
        .get('/api/exercises')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('PUT /exercises/:exerciseId', () => {
    it('Should return 403 on update exercise without accessToken', async () => {
      await request(app)
        .put('/api/exercises/any_id')
        .send({
          name: 'Bench Press',
          description: 'Lying on the training chair',
          isTemplate: true
        })
        .expect(403)
    })

    it('Should return 200 on update exercise with valid accessToken', async () => {
      const exerciseId = MongoHelper.createObjectId()
      const insertedId = await makeAccount()
      const accessToken = await makeAccessToken(insertedId)
      const firstVariationId = MongoHelper.createObjectId()
      await exerciseCollection.insertOne({
        _id: exerciseId,
        name: 'any_name',
        description: 'any_description',
        accountId: insertedId,
        isTemplate: true,
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
      })

      await request(app)
        .put(`/api/exercises/${exerciseId.toString()}`)
        .set('x-access-token', accessToken)
        .send({
          name: 'updated_name',
          description: 'updated_description',
          isTemplate: false
        })
        .expect(200)
    })
  })
})
