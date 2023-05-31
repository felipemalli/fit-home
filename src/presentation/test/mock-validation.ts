import { Validation } from '@/presentation/protocols'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

export class ValidationSpy implements Validation {
  input: any
  error: Error | undefined = undefined

  validate (input: any): Error | undefined {
    this.input = input
    return this.error
  }
}
