interface CalItem {
  inputValue: string[],
  displayValue: string
}
export default class Calculator implements CalItem{

  inputValue: string[]
  displayValue: string

  static instance: Calculator = new Calculator()

  private constructor(
    inputValue: string[] = [],
    displayValue: string = '0',
  ) {
    this.inputValue = inputValue
    this.displayValue = displayValue
  }

  clear() {
    this.inputValue = []
    this.displayValue = '0'
  }

  appendNumber(textValue: string) {
    if (textValue && textValue.length) {
      this.inputValue.push(textValue)
    }
  }

  setDisplay(value: string) {
    this.displayValue = value
  }

  render() {
    const display = document.querySelector('.display-value') as HTMLInputElement
    display.innerText = this.displayValue
  }

  compute() {
    if (isNaN(Number(this.inputValue[0]))) {
      this.inputValue = []
      this.displayValue = '0'
      return
    } 

    if (this.inputValue.length < 3 || this.inputValue.length % 2 === 0) return
    while (this.inputValue.length > 1) {
      const firstOperate = ['×', '÷']
      const otherOperate = ['+', '-']

      let operationIndex = this.inputValue.findIndex((letter) => firstOperate.includes(letter))

      if (operationIndex === -1) {
        operationIndex = this.inputValue.findIndex((letter) => otherOperate.includes(letter))
      }

      if (operationIndex > 0) {
        const num1 = Number(this.inputValue[operationIndex - 1])
        const num2 = Number(this.inputValue[operationIndex + 1])

        let sum = 0

        switch (this.inputValue[operationIndex]) {
          case '×':
            sum = num1 * num2
            break;
          case '÷':
            sum = num1 / num2
            break;
          case '+':
            sum = num1 + num2
            break;
          case '-':
            sum = num1 - num2
            break;
        }

        this.inputValue.splice(operationIndex - 1, 3, sum.toString())
      }
      
    }
    this.displayValue = this.inputValue[0] ? this.inputValue[0] : '0'
  }
}
