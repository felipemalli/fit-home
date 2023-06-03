import { AccountModel } from '@/domain/models/accounts/account'
import { AuthenticationModel } from '@/domain/models/accounts/authentication'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { mockAccountModel, mockAuthenticationModel } from '@/domain/test/mock-account'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  result: AuthenticationModel | null = mockAuthenticationModel()

  async auth (params: AuthenticationParams): Promise<AuthenticationModel | null> {
    this.params = params
    return this.result
  }
}

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: boolean = true

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  acessToken: string
  role: string | undefined
  result: AccountModel | null = mockAccountModel()

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    this.acessToken = accessToken
    this.role = role
    return this.result
  }
}
