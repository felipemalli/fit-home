import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepositoy: AddAccountRepository

  constructor (hasher: Hasher, addAccountRepositoy: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepositoy = addAccountRepositoy
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepositoy.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
