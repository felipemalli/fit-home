import { Hasher } from '#/data/protocols/criptography/hasher'
import { Decrypter } from '#/data/protocols/criptography/decrypter'
import { Encrypter } from '#/data/protocols/criptography/encrypter'
import { HashComparer } from '#/data/protocols/criptography/hash-comparer'

export class HasherSpy implements Hasher {
  digest = 'hashed_password'
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = 'any_token'
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext: string | null = 'any_value'
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string | null> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}
