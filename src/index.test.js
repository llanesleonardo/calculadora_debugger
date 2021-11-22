/**
 * @jest-environment jsdom
 */
import { concatValues, isOperator, checkLastItem, result, eventKey } from './index'

describe('pruebas con calculadora functional', () => {
  it('concatenar valores', () => {
    const testArray = ['12']
    const newValue = '3'
    expect(concatValues(testArray, newValue).join('')).toBe('123')
  })
})
