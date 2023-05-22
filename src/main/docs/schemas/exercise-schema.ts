export const exerciseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    isTemplate: {
      type: 'boolean'
    },
    variations: {
      type: 'array',
      items: {
        $ref: '#/schemas/exerciseVariation'
      }
    }
  }
}
