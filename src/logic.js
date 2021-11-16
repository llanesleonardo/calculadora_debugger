import Big from 'big.js'
// Function to get results calculated and displayed.
export const getResults = (first, second, operation) => {
  const operations = {
    '+': (first, second) => Big(first).plus(Big(second)),
    '-': (first, second) => Big(first).minus(Big(second)),
    '*': (first, second) => Big(first).times(Big(second)),
    '/': (first, second) => Big(first).div(Big(second))
  }
  const result = operations[operation](first, second)
  return parseInt(result)
}
