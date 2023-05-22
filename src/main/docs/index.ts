import { exercisePath, loginPath, signUpPath } from './paths'
import { accountSchema, loginParamsSchema, errorSchema, exerciseSchema, exercisesSchema, exerciseVariationSchema, apiKeyAuthSchema, signUpParamsSchema } from './schemas'
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
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    exercise: exerciseSchema,
    exercises: exercisesSchema,
    exerciseVariation: exerciseVariationSchema
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
