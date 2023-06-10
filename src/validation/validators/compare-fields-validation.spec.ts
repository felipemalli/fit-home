
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '#/presentation/errors'

const field = 'any_field'
const fieldToCompare = 'any_other_field'
const value = 'any_value'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  it('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  it('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeUndefined()
  })
})
