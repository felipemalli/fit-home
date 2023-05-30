import { accountSchema, loginParamsSchema, errorSchema, exerciseSchema, exercisesSchema, exerciseVariationSchema, signUpParamsSchema, addExerciseParamsSchema, updateExerciseParamsSchema, exerciseConfigurationSchema } from './schemas/'

export default {
  error: errorSchema,
  account: accountSchema,
  exercise: exerciseSchema,
  exercises: exercisesSchema,
  exerciseVariation: exerciseVariationSchema,
  exerciseConfiguration: exerciseConfigurationSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addExerciseParams: addExerciseParamsSchema,
  updateExerciseParams: updateExerciseParamsSchema
}
