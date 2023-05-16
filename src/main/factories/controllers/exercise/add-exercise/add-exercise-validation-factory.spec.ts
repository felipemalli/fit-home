
import { makeAddExerciseValidation } from './add-exercise-validation-factory'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('ExerciseValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddExerciseValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'isTemplate', 'variationName', 'series', 'betweenSeriesTime', 'repetitions', 'repetitionTime']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
