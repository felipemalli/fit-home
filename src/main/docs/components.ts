import { badRequest, unauthorized, notFound, serverError, forbidden } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  notFound,
  serverError,
  forbidden
}
