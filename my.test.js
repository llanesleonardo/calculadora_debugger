import { sum } from './src/example'

describe('Test Example Using es6 Modules', () => {
  test('Test sum function ', () => {
    expect(sum(2, 2)).toEqual(4)
  })
})
