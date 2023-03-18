import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepositoy: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepositoy: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepositoy = addAccountRepositoy
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepositoy.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
