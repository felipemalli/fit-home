import { AccountModel } from '../../../../domain/models/accounts/account'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel | null>
}
