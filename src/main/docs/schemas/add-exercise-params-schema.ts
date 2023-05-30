export const addExerciseParamsSchema = {
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
    },
    variationName: {
      type: 'string'
    },
    variationDescription: {
      type: 'string'
    },
    variationUrl: {
      type: 'string'
    },
    series: {
      type: 'number'
    },
    betweenSeriesTime: {
      type: 'number'
    },
    repetitions: {
      type: 'number'
    },
    repetitionTime: {
      type: 'number'
    },
    warmupTime: {
      type: 'number'
    },
    weight: {
      type: 'number'
    }
  },
  required: ['name', 'variationName', 'series', 'betweenSeriesTime', 'repetitions', 'repetitionTime']
}
