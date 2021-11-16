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
