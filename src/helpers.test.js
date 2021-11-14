const { valueAssign } = require('./helpers')

describe('test calculator', () => {
  test(' test assign eventListener', () => {
    const result = valueAssign('+', null, null, null)
    expect(result).toBeTruthy()
  })
})
