
import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '#/presentation/errors'

const field = 'any_field'
const value = 'any_value'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: value })
    expect(error).toEqual(new MissingParamError(field))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: value })
    expect(error).toBeUndefined()
  })
})
