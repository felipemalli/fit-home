import { AccountModel } from '../../../../domain/models/accounts/account'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
