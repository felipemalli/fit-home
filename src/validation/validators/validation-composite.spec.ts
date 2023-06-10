import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '#/presentation/errors'
import { ValidationSpy } from '#/presentation/test'

interface SutTypes {
  sut: ValidationComposite
  validationSpys: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpys = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpys)
  return {
    sut,
    validationSpys
  }
}

const field = 'any_field'
const value = 'any_value'

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationSpys } = makeSut()
    validationSpys[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: value })
    expect(error).toEqual(validationSpys[1].error)
  })

  it('Should return the first error if more than one validation fails', () => {
    const { sut, validationSpys } = makeSut()
    validationSpys[0].error = new Error()
    validationSpys[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: value })
    expect(error).toEqual(new Error())
  })

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: value })
    expect(error).toBeUndefined()
  })
})
