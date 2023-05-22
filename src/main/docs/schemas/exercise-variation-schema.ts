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
      }
    }
  }
}
