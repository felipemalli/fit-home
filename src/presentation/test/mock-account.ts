import { AccountModel } from '@/domain/models/accounts/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test/mock-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }
  return new AuthenticationStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
