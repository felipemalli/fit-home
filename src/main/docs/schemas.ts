import { accountSchema, loginParamsSchema, errorSchema, exerciseSchema, exercisesSchema, exerciseVariationSchema, signUpParamsSchema, addExerciseParamsSchema, updateExerciseParamsSchema } from './schemas/'

export default {
  error: errorSchema,
  account: accountSchema,
  exercise: exerciseSchema,
  exercises: exercisesSchema,
  exerciseVariation: exerciseVariationSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addExerciseParams: addExerciseParamsSchema,
  updateExerciseParams: updateExerciseParamsSchema
}
