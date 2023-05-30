export const exerciseVariationSchema = {
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
    url: {
      type: 'string'
    },
    configuration: {
      type: 'object',
      items: {
        $ref: '#/schemas/exerciseConfiguration'
      }
    }
  },
  required: ['id', 'name', 'configuration']
}
