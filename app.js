class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.currentOperation = "";
        this.clear();
    }
  
    clear() {
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
        if (this.currentOperation === '') {
            this.currentOperation = '0';
        }
    }

    delete() {
        this.currentOperation = this.currentOperation.slice(0, -1);
        if (this.currentOperation === '') {
            this.currentOperation = '0';
        }
    }

    appendNumber(number) {
        if (this.currentOperation === '0') {
            this.currentOperation = '';
        }
        if(number === '.' && this.currentOperation === '') {
            this.currentOperation = '0';
        }
        this.currentOperation = this.currentOperation.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperation === '') return;
        if (this.previousOperation !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    }

    compute() {
        let computation;
        const num1 = parseFloat(this.previousOperation);
        const num2 = parseFloat(this.currentOperation);
        
        if (isNaN(num1) || isNaN(num2)) return
        if (num2 === 0 && this.operation === '÷') {
            alert("You can't divide by 0!");
        }
        switch (this.operation) {
            case '+':
                computation = num1 + num2;
                break;
            
            case '-':
                computation = num1 - num2;
                break;

            case '×':
                computation = num1 * num2;
                break;

            case '÷':
                computation = num1 / num2;
                break;

            default: 
                return;
        }
        this.currentOperation = parseFloat(computation.toFixed(9));
        this.operation = undefined;
        this.previousOperation = '';
    }

    percent() {
        this.currentOperation = this.currentOperation / 100;
    }

    sign() {
        if (parseFloat(this.currentOperation) > 0) {
            this.currentOperation = parseFloat(this.currentOperation) * -1;
            this.currentOperation = this.currentOperation.toString();
          } else if (this.currentOperation.includes("-")) {
            this.currentOperation = this.currentOperation.substring(1);
        }
    }

    updateDisplay() {
        this.currentOperationTextElement.innerText = this.currentOperation;
        if (this.operation != null) {
            this.previousOperationTextElement.innerText = 
                `${this.previousOperation} ${this.operation} ${this.currentOperation}`;
        } else {
            this.previousOperationTextElement.innerText = '';
        }
    }

    keyConverter(keyOperator) {
        if (keyOperator === '-') return '-';
        if (keyOperator === '+') return '+';
        if (keyOperator === '*') return '×';
        if (keyOperator === '/') return '÷';
    }

}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const allClearButton = document.getElementById('all-clear');
const deleteButton = document.getElementById('delete');
const signButton = document.getElementById('plus-minus');
const percentButton = document.getElementById('percent');
const previousOperationTextElement = document.querySelector('.previous-operation');
const currentOperationTextElement = document.querySelector('.current-operation');

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

signButton.addEventListener('click', button => {
    calculator.sign();
    calculator.updateDisplay();
})

percentButton.addEventListener('click', button => {
    calculator.percent();
    calculator.updateDisplay();
})

document.addEventListener('keydown', (e) =>  {
    const keyName = e.key;

    if (keyName >= '0' && keyName <= '9') {
        calculator.appendNumber(keyName);
        calculator.updateDisplay();
    }

    if (keyName === '.') {
        calculator.appendNumber(keyName);
        calculator.updateDisplay();
    }

    if (keyName === '-' || keyName === '+' || keyName === '*' || keyName === '/') {
        calculator.chooseOperation(calculator.keyConverter(keyName));
        calculator.compute(keyName);
        calculator.updateDisplay();
    }
    
    if (keyName === '=' || keyName === 'Enter') {
        calculator.compute(keyName);
        calculator.updateDisplay();
        calculator.chooseOperation();
    }

    if (keyName === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }

    if (keyName === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }

    if (keyName === 'ArrowUp' || keyName === 'ArrowDown') {
        calculator.sign();
        calculator.updateDisplay();
    }

    if (keyName === '%') {
        calculator.percent();
        calculator.updateDisplay();
    }

})