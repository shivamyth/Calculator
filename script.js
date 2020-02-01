class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = '' ;
    this.previousOperand = '' ;
    this.operation = undefined ;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')){
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === ''){
      return;
    }
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '' ;
  }

  compute() {
    let ans;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)){
     return;
    }
    switch (this.operation) {
      case '+':
        ans = prev + current;
        break;
      case '-':
        ans = prev - current;
        break;
      case '*':
        ans = prev * current;
        break
      case '÷':
        ans = prev / current;
      case '%':
        ans = prev/100;
        break;
      default:
        return;
    }
    this.currentOperand = ans;
    this.operation = undefined;
    this.previousOperand = '' ;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '' ;
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    
  }
}


const numberButtons = document.querySelectorAll('[number]');
const operationButtons = document.querySelectorAll('[operation]');
const equalsButton = document.querySelector('[equals]');
const allClearButton = document.querySelector('[all-clear]');
const previousOperandText = document.querySelector('[previous-operand]');
const currentOperandText = document.querySelector('[current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});