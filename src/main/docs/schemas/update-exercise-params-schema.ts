export const updateExerciseParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    isTemplate: {
      type: 'boolean'
    }
  }
}
