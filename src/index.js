// Notes:
// You can add markup, add classes etc. with no problem. Your goal is to make it work no matter how ugly it will look :)
// Remember about object['fieldName'] access, that function can be passed around etc. This may help you solve this task.

const operations = document.querySelectorAll('.operation')
const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const reset = document.querySelector('.reset')
const result = document.querySelector('.result')

const keys = [...operations, ...numbers, equal, reset, result]

//console.table(keys)

// Map/Object of the operations that calc can perform.
const OPERATIONS = {
  '+': (first, second) => Big(first).plus(Big(second)),
  '-': (first, second) => Big(first).minus(Big(second)),
  '*': (first, second) => Big(first).times(Big(second)),
  '/': (first, second) => Big(first).div(Big(second))
}

main(keys, OPERATIONS, result)

function main(keys, OPERATIONS, result) {
  // First input value
  let firstValue = ''
  // Second input value after the operation
  let secondValue = ''
  // Saved value of second, when equals was pressed to have 25 + 5 = 30 = 35 = 40 = 45 functionality
  let prevSecond = ''
  // When first number is filled in, and operation is chosen this fill be true
  let isFirstDone = false
  // When first input this flag helps to add 0. when . was clicked as first thing
  let isFirstInput = true
  // When first number was given to second variable, this becomes done since we don't wait for operation
  let isSecondDone = false

  keys.map(key => {
    key.addEventListener('click', event => {
      let valuer = valueKeyHandler(
        key.innerText,
        OPERATIONS,
        event,
        firstValue,
        secondValue,
        result,
        prevSecond,
        isFirstDone,
        isFirstInput,
        isSecondDone
      )
      console.log(valuer)
    })
  })
}

function valueKeyHandler(
  key,
  OPERATIONS,
  e,
  first,
  second,
  result,
  prevSecond,
  isFirstDone,
  isFirstInput,
  isSecondDone
) {
  let operationHandler_eraseSecond
  let getFunOperation
  let OperationDone
  let handleDecimal = null
  let OneOrSecondVerifyValue
  let evaluateSecondOperation
  let OperationInProgressFlag
  let getValue

  switch (key) {
    case '+':
    case '-':
    case '*':
    case '/':
      operationHandler_eraseSecond = prevSecond => (prevSecond = undefined)
      getFunOperation = (e, OPERATIONS) => OPERATIONS[e.target.innerText]
      OperationDone = operationHandler(isFirstDone, isSecondDone, isFirstInput)
      OperationInProgressFlag = OperationInProgress(OperationDone, isFirstDone, isFirstInput)
      getValue = getResultsValue(OperationDone, getFunOperation, first, second, result)
      first = getValue
      return getValue
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      operationHandler_eraseSecond = prevSecond => (prevSecond = undefined)
      handleDecimal = handleDot(e.target.innerText, isFirstInput, OperationInProgressFlag)
      changeFirstInput = handleDecimal => (handleDecimal !== null ? false : true)
      evaluateSecondOperation = OperationInProgressFlag =>
        OperationInProgressFlag === true ? (isSecondDone = false) : (isSecondDone = true)
      OneOrSecondVerifyValue = OneOrSecondVerify(
        e.target.innerText,
        OperationInProgress,
        first,
        second
      )
      return OneOrSecondVerifyValue
    case '=':
      //   equalFun()
      return true
    case 'C':
      // resetFun()
      return true
    default:
      return false
  }
}

function OneOrSecondVerify(value, isFirstDone, first, second) {
  // If it was validated correctly we can proceed with input of it
  if (!isFirstDone) {
    first = first + value
    result.innerText = first
    // If first value was already done we proceed with same logic for second value
  } else {
    second = second + value
    result.innerText = second
  }
  return result
}

function getResultsValue(OperationDone, getFunOperation, first, second, result) {
  // We make a result first value
  if (OperationDone) {
    first = getFunOperation(first, second)
    result.innerText = first
  }

  return result
}

function operationHandler(isFirstDone, isSecondDone, isFirstInput) {
  if (isFirstDone && isSecondDone) {
    return true
  }
  return false
}

function OperationInProgress(OperationDone, isFirstDone, isFirstInput) {
  if (!OperationDone) {
    if (isFirstDone || !isFirstInput) {
      isFirstDone = true

      return isFirstDone
    }
  }
  return false
}

const handleDot = (value, isFirstInput, isFirstDone) => {
  if (isFirstInput) {
    return value !== '.' ? value : '0.'
  }
  if (isFirstDone && isFirstInput) {
    return value !== '.' ? value : '0.'
  }
  return value
}
