// Extración de objetos DIV HTML de la interfaz del navegador
const operations = document.querySelectorAll('.operation')
const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')
const reset = document.querySelector('.reset')
const result = document.querySelector('.result')

// Combinar todos los elementos div en un arreglo para su mejor manejo
export const keys = [...operations, ...numbers, equal, reset, result]
/* calculator in javascript using functional programming principles */
// definir en un array cuales son los operandos para usarse en la calculadora
export const operators = ['+', '*', '-', '/']
// definir en un arreglo de objetos segun el operando que  función utilizará la calculadora
export const formulas = {
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
}
// definir un arreglo que tendra los valores transitorios
export let valuesCalc = []
// Revisar su el valor del evento es un operando (+,-,*,/)
export const isOperator = valueEvent => operators.includes(valueEvent)
//Reviar su el ultimo valor del arreglo es un operando, utiliza la función anterior
export const checkLastItem = newArray => isOperator(newArray[newArray.length - 1])

// recorrer un arreglo mediante un map
keys.map(key => {
  // Cada valor del arreglo (objeto) tendrá un evento click 
  key.addEventListener('click', e => {
    let resultDiv = result
    let EventArray = [e.target.innerText]
    // función para probar los valores ingresados y el arreglo
    main(resultDiv, EventArray, valuesCalc)
    let lastItemArray
    console.log(valuesCalc)
   // compara su el valor del evento es igual a =
    if (EventArray[0] === '=') {
      console.log(EventArray[0])
      let currentValueCalc = resultDiv.innerText
      let doTheCalc
      // función que genera un proceso donde al final devuelve el resultado final de la operación en la calculadora [1,+,2] = 3
      doTheCalc = valuesCalc.length !== 0 ? operateProcess(valuesCalc) : currentValueCalc // envia el valor final de las operaciones al dar click en "="
      resultDiv.innerText = doTheCalc
     // vacía el arreglo para la siguiente operación
      valuesCalc = []
     // compara su el valor del evento es igual a C
    } else if (EventArray[0] === 'C') {
      console.log(EventArray[0])
      resultDiv.innerText = 0
     // vacía el arreglo para la siguiente operación
      valuesCalc = []
    } else {
      // si el valor del evento es diferente a "=" o "C"  entra en esta sección
      // función que concatena todos los valores del evento en un arreglo
      valuesCalc = concatValues(valuesCalc, EventArray[0])
      // toma el ultimo valor del arreglo
      lastItemArray = valuesCalc[valuesCalc.length - 1]
      resultDiv.innerText =
        isOperator(lastItemArray) === true ? valuesCalc[valuesCalc.length - 2] : lastItemArray
    }
    // main(resultDiv, EventArray, valuesCalc)
  })
})
// función para probar los valores ingresados y el arreglo
export const main = (resultDiv, EventArray, valuesCalc) => {
  console.log('resultDiv', resultDiv)
  console.log('EventArray', EventArray)
  console.log('valuesCalc', valuesCalc)
}

// función que concatena todos los valores del evento en un arreglo
export const concatValues = (valuesCalculator, calculationValues) => {
  const newArray = [...valuesCalculator]
  let isAnOperator = isOperator(calculationValues)
  if (newArray.length >= 1 && isAnOperator === false) {
    // Si es numero
    let findOperando = checkLastItem(newArray) //si este numero tiene un operador a la izquerda
    let LastItemArray = newArray[newArray.length - 1]
    let otherArray = [...newArray]

 // Si el ultimo valor del arreglo es un operando concatenar solamente, si no es un operando crear otro arreglo que su ultimo valor sea un join del ulimo valor pasado y el nuevo valor
    return findOperando === true
      ? newArray.concat(calculationValues)
      : (otherArray = [
          ...newArray.splice(0, newArray.length - 1),
          LastItemArray + calculationValues
        ])
  }
  if (newArray.length >= 1 && isAnOperator) return newArray.concat(calculationValues) // si es operador

  // si la longitud del arreglo es 0 ejecuta este código
  return isAnOperator === true ? newArray : newArray.concat(calculationValues)
}

// función recursiva para resolver el arreglo
export const operateProcess = valuesCalc1 => {
// Si el arreglo tiene un solo valor
  if (valuesCalc1.length === 1) return valuesCalc1[0]
  return operateProcess(calculateResult(valuesCalc1, findOperator(valuesCalc1)))
}

// Función que revisa en el arreglo el indice donde se encuentran los operandos ( en esta versión solamente revisa 1 operando)
export const findOperator = valuesCalc2 => {
  // console.log('valuesCalc2', valuesCalc2)
  const nextIndex = valuesCalc2.findIndex(value => value === '*' || value === '/')
  return nextIndex !== -1
    ? nextIndex
    : valuesCalc2.findIndex(value => value === '-' || value === '+')
}

//función que calcula mediante el arreglo de objetos de funciones "formulas" el valor de la operación que se realizó en la calculadora
export const calculateResult = (valuesCalc3, index) => {
  if (index === -1) return valuesCalc3
  const resultFromFormulas = formulas[valuesCalc3[index]](
    +valuesCalc3[index - 1],
    +valuesCalc3[index + 1]
  )
  // usamos map para recorrer el arreglo de valores (lo que hemos tecleado hasta el momento y despues dimos click en "=") 
  // si el indice del arreglo revisado anteriormente es igual que el indice del mapa generar un resultado en base a una formula si no dejar el valor actual
  // con filter si el indice del arreglo es menor al indice anterior o si el indice es mejor al (indice anterior mas uno) filtrar el resultado (solamente ve dejando en 
  // el arreglo el valor ya calculado
  return valuesCalc3
    .map((item, jindex) => (index - 1 === jindex ? resultFromFormulas : item))
    .filter((item, jindex) => jindex < index || jindex > index + 1)
}
