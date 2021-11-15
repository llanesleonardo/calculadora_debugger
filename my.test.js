import { sum, substract } from './src/example'

describe('Test Example Using es6 Modules', () => {
  test('Test sum function ', () => {
    expect(sum(2, 2)).toEqual(4)
  })

  test('Test substract function ', () => {
    expect(substract(2, 2)).toEqual(0)
  })
})
