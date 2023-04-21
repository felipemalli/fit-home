
import { Validation } from '../../../../../presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'

export const makeAddExerciseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'accountId', 'variationName', 'series', 'betweenSeriesTime', 'repetitions', 'repetitionTime']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
