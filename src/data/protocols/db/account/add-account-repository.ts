import { AddAccountModel } from '@/domain/usecases/account/add-account'
import { AccountModel } from '@/domain/models/accounts/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
