import { AccountModel } from '../models/accounts/account'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
