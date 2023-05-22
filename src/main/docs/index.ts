import { exercisePath, loginPath, signUpPath } from './paths'
import { accountSchema, loginParamsSchema, errorSchema, exerciseSchema, exercisesSchema, exerciseVariationSchema, apiKeyAuthSchema, signUpParamsSchema, addExerciseParamsSchema } from './schemas'
import { badRequest, unauthorized, notFound, serverError, forbidden } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Fit Home API',
    description: 'API for handling physical exercises organization and improve their efficiency',
    version: '1.0.0'
  },
  license: {
    name: 'ISC',
    url: ''
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },
  {
    name: 'Exercise'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/exercises': exercisePath
  },
  schemas: {
    error: errorSchema,
    account: accountSchema,
    exercise: exerciseSchema,
    exercises: exercisesSchema,
    exerciseVariation: exerciseVariationSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addExerciseParams: addExerciseParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    notFound,
    serverError,
    forbidden
  }
}
