const operations = document.querySelectorAll('.operation')
const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const reset = document.querySelector('.reset')
const result = document.querySelector('.result')

export const keys = [...operations, ...numbers, equal, reset, result]
/* calculator in javascript using functional programming principles */
export const operators = ['+', '*', '-', '/']

export const formulas = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
}

export let valuesCalc = []

export const isOperator = valueEvent => operators.includes(valueEvent)
export const checkLastItem = newArray => isOperator(newArray[newArray.length - 1])

keys.map(key => {
  key.addEventListener('click', e => {
    let resultDiv = result
    let EventArray = [e.target.innerText]
    main(resultDiv, EventArray, valuesCalc)
    let lastItemArray
    console.log(valuesCalc)
    if (EventArray[0] !== '=') {
      valuesCalc = concatValues(valuesCalc, EventArray[0])
      lastItemArray = valuesCalc[valuesCalc.length - 1]
      resultDiv.innerText =
        isOperator(lastItemArray) === true ? valuesCalc[valuesCalc.length - 2] : lastItemArray
    } else {
      console.log(EventArray[0])
      let currentValueCalc = resultDiv.innerText
      let doTheCalc
      doTheCalc = valuesCalc.length !== 0 ? operateProcess(valuesCalc) : currentValueCalc // envia el valor final de las operaciones al dar click en "="
      resultDiv.innerText = doTheCalc
      valuesCalc = []
    }
    // main(resultDiv, EventArray, valuesCalc)
  })
})

export const main = (resultDiv, EventArray, valuesCalc) => {
  console.log('resultDiv', resultDiv)
  console.log('EventArray', EventArray)
  console.log('valuesCalc', valuesCalc)
}
//TODO si le aplasto igual debe de saber si existe un operando

export const concatValues = (valuesCalculator, calculationValues) => {
  const newArray = [...valuesCalculator]
  let isAnOperator = isOperator(calculationValues)
  if (newArray.length >= 1 && isAnOperator === false) {
    // Si es numero
    let findOperando = checkLastItem(newArray) //si este numero tiene un operador a la izquerda
    let LastItemArray = newArray[newArray.length - 1]
    let otherArray = [...newArray]

    return findOperando === true
      ? newArray.concat(calculationValues)
      : (otherArray = [
          ...newArray.splice(0, newArray.length - 1),
          LastItemArray + calculationValues
        ])
  }
  if (newArray.length >= 1 && isAnOperator) return newArray.concat(calculationValues) // si es operador
  return isAnOperator === true ? newArray : newArray.concat(calculationValues)
}

export const operateProcess = valuesCalc1 => {
  if (valuesCalc1.length === 1) return valuesCalc1[0]
  return operateProcess(calculateResult(valuesCalc1, findOperator(valuesCalc1)))
}

export const findOperator = valuesCalc2 => {
  // console.log('valuesCalc2', valuesCalc2)
  const nextIndex = valuesCalc2.findIndex(value => value === '*' || value === '/')
  return nextIndex !== -1
    ? nextIndex
    : valuesCalc2.findIndex(value => value === '-' || value === '+')
}

export const calculateResult = (valuesCalc3, index) => {
  if (index === -1) return valuesCalc3
  const resultFromFormulas = formulas[valuesCalc3[index]](
    +valuesCalc3[index - 1],
    +valuesCalc3[index + 1]
  )
  return valuesCalc3
    .map((item, jindex) => (index - 1 === jindex ? resultFromFormulas : item))
    .filter((item, jindex) => jindex < index || jindex > index + 1)
}
