import { AccountMongoRepository } from './account-mongo-repository'
import { mockAddAccountParams } from '@/domain/test'
import { MongoHelper, Collection } from '../helpers/mongo-helper'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    it('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    it('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    it('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    it('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const { insertedId } = await accountCollection.insertOne(mockAddAccountParams())
      const id = insertedId.toString()
      const accountBeforeUpdate = await accountCollection.findOne({ _id: insertedId })
      expect(accountBeforeUpdate?.accessToken).toBeFalsy()
      await sut.updateAccessToken(id, 'any_token')
      const account = await accountCollection.findOne({ _id: insertedId })
      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    it('Should return an account on loadByToken success if user is not admin and not requires admin role', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({},
        addAccountParams,
        { accessToken: 'any_token' }
      ))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
    })

    it('Should return an account on loadByToken success if user is admin and requires admin role', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({},
        addAccountParams,
        {
          accessToken: 'any_token',
          role: 'admin'
        }
      ))
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
    })

    it('Should return an account on loadByToken success if user is admin and not requires admin role', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(Object.assign({},
        addAccountParams,
        {
          accessToken: 'any_token',
          role: 'admin'
        }
      ))
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
    })

    it('Should return null on loadByToken if user is not admin and requires admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(Object.assign({},
        mockAddAccountParams(),
        { accessToken: 'any_token' }
      ))
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeNull()
    })

    it('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeNull()
    })
  })
})
