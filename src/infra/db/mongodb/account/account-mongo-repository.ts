import { MongoHelper } from '#/infra/db/mongodb/helpers/mongo-helper'
import { AddAccountRepository } from '#/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '#/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '#/data/protocols/db/account/update-access-token-repository'
import { LoadAccountByTokenRepository } from '#/data/protocols/db/account/load-account-by-token-repository'
import { CheckAccountByEmailRepository } from '#/data/protocols/db/account/check-account-by-email-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository {
  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: insertedId })
    return !!account
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return !!account
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: MongoHelper.createObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, requiredRole?: string): Promise<LoadAccountByTokenRepository.Result | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role: requiredRole
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
