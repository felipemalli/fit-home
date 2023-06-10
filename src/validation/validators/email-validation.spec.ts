
import { EmailValidation } from './email-validation'
import { EmailValidatorSpy } from '#/validation/test'
import { InvalidParamError } from '#/presentation/errors'

interface SutTypes {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const field = 'any_field'
const email = 'any_email@mail.com'

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  it('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
