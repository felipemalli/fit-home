import { AccountModel } from '@/domain/models/accounts/account'

export interface AddAccountModel extends Omit<AccountModel, 'id'> {}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}
