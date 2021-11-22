// Notes:
// You can add markup, add classes etc. with no problem. Your goal is to make it work no matter how ugly it will look :)
// Remember about object['fieldName'] access, that function can be passed around etc. This may help you solve this task.

const operations = document.querySelectorAll('.operation')
const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const reset = document.querySelector('.reset')
const result = document.querySelector('.result')

const keys = [...operations, ...numbers, equal, reset, result]

console.table(keys)
// First input value
let first = ''
// Second input value after the operation
let second = ''
// Saved value of second, when equals was pressed to have 25 + 5 = 30 = 35 = 40 = 45 functionality
let prevSecond = ''
// When first number is filled in, and operation is chosen this fill be true
let isFirstDone = false
// When first input this flag helps to add 0. when . was clicked as first thing
let isFirstInput = true
// When first number was given to second variable, this becomes done since we don't wait for operation
let isSecondDone = false

// variable to memorize operation function, to call it afterwards
let action

// Map/Object of the operations that calc can perform.
const OPERATIONS = {
  '+': (first, second) => Big(first).plus(Big(second)),
  '-': (first, second) => Big(first).minus(Big(second)),
  '*': (first, second) => Big(first).times(Big(second)),
  '/': (first, second) => Big(first).div(Big(second))
}

// Function to get results calculated and displayed.
const getResults = () => {
  // We make a result first value
  first = action(first, second)
  result.innerText = first
  // Resetting second
  second = ''
  // Reseting all second value related flags to initial state
  isFirstInput = true
  isSecondDone = false
  // All those actions basically makes us to point where first value is filled
  // and operation is to be changed, or to be kept if we want to continue doing same thing
  // first oper second  equal first oper ---> oper/second
  // 5     +    10      =     15    +    <--- we can keep this operation or change
  // Hence can be continued like 15 - 8 = 7 if we change oper, or 15 + 5 = 20 if we doesn't
}

operations.forEach(operation =>
  operation.addEventListener('click', e => {
    // This is to reset case when 20 + 5 = 25 and each click on = will do +5 operation
    prevSecond = undefined
    // We get an operation using obj['field'] notation to access field
    const operation = OPERATIONS[e.target.innerText]
    // if both are done and operation is clicked again
    // we get results using prev operation (as if we click = ) and then we change an operation
    if (isFirstDone && isSecondDone) {
      getResults()
      action = operation
      // This return is to avoid code at the bottom from execution
      return
    }
    // if First is valid means we can safely choose operation, and set first as done

    // Here we assign function we do not call it like operation(). It's done to save it and execute later
    // in getResult
    if (isFirstDone || !isFirstInput) {
      action = operation
      isFirstDone = true
    }
  })
)

const handleDot = value => {
  if (isFirstInput) {
    isFirstInput = false
    return value !== '.' ? value : '0.'
  }
  if (isFirstDone && isFirstInput) {
    isFirstInput = false
    return value !== '.' ? value : '0.'
  }
  isFirstInput = false
  return value
}

// Adding listener to all numbers buttons
numbers.forEach(number =>
  number.addEventListener('click', e => {
    // This is to reset case when 20 + 5 = 25 and each click on = will do +5 operation
    prevSecond = undefined
    // we get the digit
    let aDigit = e.target.innerText
    aDigit = handleDot(aDigit)
    // If it was validated correctly we can proceed with input of it
    if (!isFirstDone) {
      first = first + aDigit
      result.innerText = first
      // If first value was already done we proceed with same logic for second value
    } else {
      second = second + aDigit
      result.innerText = second
      // After first valid value was passed to second, we can make it done, cause we
      // don't wait for operation in second value case
      isSecondDone = true
    }
  })
)

// Adding listener to equal button
equal.addEventListener('click', () => {
  // If both are good values to do an operation both of them will have flag of true
  if (isFirstDone && isSecondDone) {
    prevSecond = second
    getResults()
  } else if (isFirstDone && prevSecond) {
    second = prevSecond
    getResults()
  }
})

// Reset everything totally
reset.addEventListener('click', () => {
  first = ''
  second = ''
  isFirstDone = false
  isSecondDone = false
  result.innerText = '0'
  isFirstInput = true
  action = undefined
})

///////////////////////////////////////////////////////////////////////
// Notes:
/* calculator in javascript using functional programming principles */
const operators = ['+', '*', '-', '/']

//isOperator checks if a given character is an operator
const isOperator = char => operators.includes(char)
/* all operations to be used */
const operations = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
}

/* mergeOperation merge an operation around a given operator index
i.e : mergeOperation(["13", "+", "6", "*", "2"], 3)
--> ["13", "+", "12"]
*/
const mergeOperation = (calculation, i) => {
  console.log(calculation + ' ------->' + i)
  if (i === -1) return calculation
  const result = operations[calculation[i]](+calculation[i - 1], +calculation[i + 1])
  console.log(+calculation[i + 1])
  return calculation
    .map((item, j) => (i - 1 === j ? result : item))
    .filter((item, j) => j < i || j > i + 1)
}

/* getNextOperatorIndex retrieves the next operator index of a calculation array
prioritizing * and / operator
*/
const getNextOperatorIndex = calculation => {
  const nextIndex = calculation.findIndex(operator => ['*', '/'].includes(operator))
  return nextIndex !== -1
    ? nextIndex
    : calculation.findIndex(operator => ['+', '-'].includes(operator))
}

/* operate reduces recursively a calculation untils all its operations have been done
i.e : ["13", "+", "6", "*", "2"]
--> ["13", "+", 12]
--> 25
*/
const operate = calculation => {
  if (calculation.length === 1) return calculation[0]
  return operate(mergeOperation(calculation, getNextOperatorIndex(calculation)))
}

/* formatCalculation converts a calculation string to an array
i.e : "13+6*2"
--> ["13", "+", "6", "*", "2"]
*/
const formatCalculation = (calculationString, arr = '') => {
  if (!calculationString) return arr.split(' ')
  const firstChar = calculationString[0]
  console.log(typeof arr)
  return formatCalculation(
    calculationString.slice(1),
    arr.concat(isOperator(firstChar) ? ` ${firstChar} ` : firstChar)
  )
}

/* takes a calculation string and returns a result */
const calculate = calculationString => {
  const calculation = formatCalculation(calculationString)
  return operate(calculation, getNextOperatorIndex(calculation))
}

console.log(calculate('13+6*2'))
