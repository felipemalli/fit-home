export const exercisePath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Exercise'],
    summary: 'API for list all exercises of an account',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/exercises'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
