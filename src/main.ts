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
      const target = event.target  as HTMLDivElement
      
      if (!isNaN(Number(calculator.inputValue[calculator.inputValue.length - 1])) && target.classList.contains('num-btn')) {
        calculator.clear()
      }

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
        calculator.appendNumber(currentValue)
        if ('+-×÷'.includes(calculator.inputValue[calculator.inputValue.length - 2])) {
          calculator.inputValue.splice(calculator.inputValue.length - 2, 1)
        }
      }
      
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

    if (calculator.inputValue.length > 0) {
      // 取得最後一個數字的索引
      const lastIndex = calculator.inputValue.length - 1;
      currentValue = calculator.inputValue[lastIndex]
      // clear inputValue
      calculator.clear()
      // reset display
      calculator.setDisplay(currentValue)
    }

    calculator.setDisplay(Number(calculator.displayValue) > 0 ? (Math.abs(Number(calculator.displayValue)) * -1).toString() : Math.abs(Number(calculator.displayValue)).toString())
    currentValue = calculator.displayValue === '0' ? '' : calculator.displayValue
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