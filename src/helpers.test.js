const { va } = require('./helpers')

describe('test calculator', () => {
  test(' test assign eventListener', () => {
    const result = va('+', null, null, null)
    expect(result).toBeTruthy()
  })
})
