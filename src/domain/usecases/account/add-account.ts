import { AccountModel } from '@/domain/models/accounts/account'

export interface AddAccountParams extends Omit<AccountModel, 'id'> {}

export interface AddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
