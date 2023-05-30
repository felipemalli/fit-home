export const exerciseConfigurationSchema = {
  type: 'object',
  properties: {
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
  required: ['series', 'betweenSeriesTime', 'repetitions', 'repetitionTime']
}
