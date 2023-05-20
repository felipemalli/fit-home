import { AccountModel } from '@/domain/models/accounts/account'

export interface AddAccountData extends Omit<AccountModel, 'id'> {}

export interface AddAccount {
  add: (account: AddAccountData) => Promise<AccountModel | null>
}
