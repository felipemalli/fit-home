
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddExerciseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'variationName', 'series', 'betweenSeriesTime', 'repetitions', 'repetitionTime']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
