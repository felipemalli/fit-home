import { AddAccountModel } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models/accounts/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
