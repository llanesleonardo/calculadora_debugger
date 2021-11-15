const va = function valueAssign(key, operationFun, numberFun, equalFun, resetFun) {
  switch (key) {
    case '+':
    case '-':
    case '*':
    case '/':
      // operationFun(key)
      return true
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
      // numberFun(key)
      return true
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

const ae = function assignEventListener(
  keys,
  valueAssign,
  operationListener,
  numberListener,
  equalListener,
  resetListener
) {
  const result = keys.map(key => {
    key.addEventListener('click', e => {
      valueAssign(
        key.innerText,
        operationListener,
        numberListener,
        equalListener,
        resetListener
      )
    })
    return true
  })
  return result.every(v => v === true)
}

module.exports = { va, ae }
