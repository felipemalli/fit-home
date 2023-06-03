import { AccountModel, AddAccount, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepositoy: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    let newAccount: AccountModel | null = null
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      newAccount = await this.addAccountRepositoy.add({ ...accountData, password: hashedPassword })
    }
    return !!newAccount
  }
}
