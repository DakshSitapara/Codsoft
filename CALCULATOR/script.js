document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const currentOperationDisplay = document.getElementById('currentOperation');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let result = null;

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const updateCurrentOperationDisplay = () => {
        currentOperationDisplay.textContent = `${previousInput} ${operator} ${currentInput}`;
    };

    const clear = () => {
        currentInput = '';
        previousInput = '';
        operator = '';
        result = null;
        updateDisplay('0');
        currentOperationDisplay.textContent = '';
    };

    const calculate = () => {
        if (previousInput && operator && currentInput) {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert("Cannot divide by zero");
                        clear();
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }

            previousInput = result.toString();
            currentInput = '';
            operator = '';
            updateDisplay(result);
            currentOperationDisplay.textContent = '';
        }
    };

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            if (value) {
                if (!isNaN(value) || value === '.') {
                    currentInput += value;
                    updateDisplay(currentInput);
                } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                    if (currentInput === '' && previousInput !== '') {
                        operator = value;
                    } else if (currentInput !== '') {
                        if (previousInput !== '') {
                            calculate();
                        }
                        operator = value;
                        previousInput = currentInput;
                        currentInput = '';
                    }
                    updateCurrentOperationDisplay();
                }
            } else if (e.target.id === 'equals') {
                calculate();
            } else if (e.target.id === 'clear') {
                clear();
            }
        });
    });

    clear(); 
});
