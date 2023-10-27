import Calculator from "./Calculator";

const initApp = (): void => {
  const calculator = Calculator.instance
  const numBtns = document.querySelectorAll<Element>('.num-btn')
  const clearBtn = document.querySelector('.clean-value') as HTMLDivElement
  const operatorBtns = document.querySelectorAll<Element>('.operator')
  const equalBtn = document.querySelector('.equal') as HTMLDivElement
  let prevOperator: HTMLDivElement | null = null
  let currentValue: string = ''

  numBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      console.log(calculator.inputValue);
      
      const target = event.target  as HTMLDivElement
      currentValue += target.innerText
      calculator.setDisplay(currentValue)
      calculator.render()
      console.log(currentValue);
    })
    
  })

  clearBtn.addEventListener('click', () => {
    currentValue = ''
    prevOperator?.classList.remove('focus')
    calculator.clear()
    calculator.render()
  })

  operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      
      const target = event.target as HTMLDivElement
      
      if (prevOperator) {
        prevOperator.classList.remove('focus')
      }
      target.classList.add('focus')
      prevOperator = target

      calculator.appendNumber(currentValue)
      
      currentValue = target.innerText
      if (currentValue.length && calculator.inputValue[calculator.inputValue.length - 1 ] !== currentValue) {
        calculator.appendNumber(currentValue)
      }
      
      console.log('current', currentValue);
      currentValue = ''

    })
  })

  equalBtn.addEventListener('click', () => {
    // add last number into inputValue
    calculator.appendNumber(currentValue)
   
    calculator.compute()
    currentValue = ''
    prevOperator?.classList.remove('focus')
    calculator.render()
  })

}


document.addEventListener('DOMContentLoaded', initApp)