import { AddAccount } from '#/domain/usecases/account/add-account'
import { mockAuthenticationModel } from '#/domain/test/mock-account'
import { Authentication } from '#/domain/usecases/account/authentication'
import { LoadAccountByToken } from '#/domain/usecases/account/load-account-by-token'

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result: Authentication.Result | null = mockAuthenticationModel()

  async auth (params: Authentication.Params): Promise<Authentication.Result | null> {
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
  result: LoadAccountByToken.Result | null = { id: 'any_id' }

  async load (accessToken: string, role?: string | undefined): Promise<LoadAccountByToken.Result | null> {
    this.acessToken = accessToken
    this.role = role
    return this.result
  }
}
