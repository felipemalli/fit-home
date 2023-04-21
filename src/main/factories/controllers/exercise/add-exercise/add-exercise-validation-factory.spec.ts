
import { Validation } from '../../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { makeAddExerciseValidation } from './add-exercise-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('ExerciseValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddExerciseValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'accountId', 'variationName', 'series', 'betweenSeriesTime', 'repetitions', 'repetitionTime']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
