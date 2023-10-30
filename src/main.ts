import Calculator from "./Calculator";

const initApp = (): void => {
  const calculator = Calculator.instance
  const numBtns = document.querySelectorAll<Element>('.num-btn')
  const clearBtn = document.querySelector('.clean-value') as HTMLDivElement
  const operatorBtns = document.querySelectorAll<Element>('.operator')
  const equalBtn = document.querySelector('.equal') as HTMLDivElement
  const psOrne = document.querySelector('.positive-or-negative') as HTMLDivElement
  const percentageBtn = document.querySelector('.percentage') as HTMLDivElement
  let prevOperator: HTMLDivElement | null = null
  let currentValue: string = ''

  numBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      console.log(calculator.inputValue);
      
      const target = event.target  as HTMLDivElement
      
      if (currentValue.includes('.') && target.innerText === '.') {
        return
      }

      if (currentValue === '' && target.innerText === '.') {
        currentValue = '0.'
      } else {
        currentValue += target.innerText
      }
      calculator.setDisplay(currentValue)
      calculator.render()
      console.log('current1', currentValue);
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
      if (currentValue.length && calculator.inputValue[calculator.inputValue.length - 1] !== currentValue) {
        console.log(calculator.inputValue);
        calculator.appendNumber(currentValue)
        if ('+-×÷'.includes(calculator.inputValue[calculator.inputValue.length - 2])) {
          calculator.inputValue.splice(calculator.inputValue.length - 2, 1)
        }
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


  psOrne.addEventListener('click', () => {
    calculator.setDisplay(Number(currentValue) > 0 ? (Math.abs(Number(currentValue)) * -1).toString() : Math.abs(Number(currentValue)).toString())
    currentValue = calculator.displayValue === '0' ? '' : calculator.displayValue
    console.log(calculator.displayValue);
    console.log('current', currentValue);
    calculator.render()
    
  })

  percentageBtn.addEventListener('click', () => {
    const temp: string = calculator.displayValue
    calculator.clear()
    currentValue = (Number(temp) / 100).toString()
    calculator.setDisplay(currentValue)
    calculator.render()
  })
}



document.addEventListener('DOMContentLoaded', initApp)