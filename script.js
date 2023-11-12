const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', function (event) {
  if (!event.target.matches('button')) return;

  const key = event.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;

  
  function updateDisplay(value) {
    display.textContent = value;
  }

  
  function handleError(message) {
    display.textContent = message;
    
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
  }

  
  function performCalculation(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
      case 'add':
        return a + b;
      case 'subtract':
        return a - b;
      case 'multiply':
        return a * b;
      case 'divide':
       
        return b !== 0 ? a / b : 'Error';
      default:
        return b;
    }
  }

  
  if (!action) {
    displayedNum === '0'
      ? updateDisplay(keyContent)
      : updateDisplay(displayedNum + keyContent);
  } else if (action === 'decimal') {
    !displayedNum.includes('.') && updateDisplay(displayedNum + '.');
  } else if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    if (calculator.dataset.operator) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && secondValue) {
        const result = performCalculation(firstValue, operator, secondValue);
        updateDisplay(result);
        calculator.dataset.firstValue = result;
      }
    }

    calculator.dataset.firstValue = displayedNum;
    calculator.dataset.operator = action;
    updateDisplay('0');
  } else if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue && operator && secondValue) {
      const result = performCalculation(firstValue, operator, secondValue);
      updateDisplay(result);

     
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
    }
  } else if (action === 'clear') {
    updateDisplay('0');
   
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
  } else if (action === 'sqrt') {
    const currentValue = parseFloat(displayedNum);

    
    if (currentValue >= 0) {
      updateDisplay(Math.sqrt(currentValue));
    } else {
      handleError('Error');
    }
  } else if (action === 'square') {
    updateDisplay(parseFloat(displayedNum) ** 2);
  } else if (action === 'inverse') {
    const currentValue = parseFloat(displayedNum);

   
    if (currentValue !== 0) {
      updateDisplay(1 / currentValue);
    } else {
      handleError('Error');
    }
  }
});
