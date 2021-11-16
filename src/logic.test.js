import { getResults } from './logic'

describe('Test Calculator Logic', () => {
  test('Test getResults function ', () => {
    expect(getResults(1, 3, '+')).toEqual(4)
  })
})
