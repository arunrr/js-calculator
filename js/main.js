const calculatorDisplay = document.querySelector("#display");
const numberButtons = document.querySelectorAll("#number");
const operatorButtons = document.querySelectorAll("#operator");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const dotButton = document.querySelector("#dot");

let prevInputValue = "";
let currentInputValue = "";
let result = 0;
let currentOperator = "";

// Core Calculator functions
function isNumberValid(value) {
  if (isNaN(value)) {
    return 0;
  }
  return 1;
}

function convertToValidNumber(value, defaultValue = 0) {
  let convertedValue = parseFloat(value);

  if (!isNumberValid(convertedValue)) {
    convertedValue = defaultValue;
  }

  return convertedValue;
}

// Calculator operations
function add(firstNumber, secondNumber) {
  const convertedFirstNumber = convertToValidNumber(firstNumber);
  const convertedSecondNumber = convertToValidNumber(secondNumber);

  return convertedFirstNumber + convertedSecondNumber;
}

function subtract(firstNumber, secondNumber) {
  const convertedFirstNumber = convertToValidNumber(firstNumber);
  const convertedSecondNumber = convertToValidNumber(secondNumber);

  return convertedFirstNumber - convertedSecondNumber;
}

function multiply(firstNumber, secondNumber) {
  const convertedFirstNumber = convertToValidNumber(firstNumber, 1);
  const convertedSecondNumber = convertToValidNumber(secondNumber, 1);

  return convertedFirstNumber * convertedSecondNumber;
}

function divide(firstNumber, secondNumber) {
  const convertedFirstNumber = convertToValidNumber(firstNumber, 1);
  const convertedSecondNumber = convertToValidNumber(secondNumber, 1);

  if (convertedSecondNumber === 0) {
    return "Operation not permitted";
  }

  return convertedFirstNumber / convertedSecondNumber;
}

function percentage(firstNumber, secondNumber = 0) {
  const convertedFirstNumber = convertToValidNumber(firstNumber);
  const convertedSecondNumber = convertToValidNumber(secondNumber);

  if (convertedSecondNumber === 0) {
    return convertedFirstNumber / 100;
  }

  return (convertedFirstNumber / 100) * convertedSecondNumber;
}

function remainder(firstNumber, secondNumber) {
  const convertedFirstNumber = convertToValidNumber(firstNumber, 1);
  const convertedSecondNumber = convertToValidNumber(secondNumber, 1);

  if (convertedSecondNumber === 0) {
    return "Operation not permitted";
  }

  return convertedFirstNumber % convertedSecondNumber;
}

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  }
  if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  }
  if (operator === "x") {
    return multiply(firstNumber, secondNumber);
  }
  if (operator === "/") {
    return divide(firstNumber, secondNumber);
  }
  if (operator === "%") {
    return remainder(firstNumber, secondNumber);
  }

  return;
}

// Calculator display functions

function resetDisplay() {
  prevInputValue = "";
  currentInputValue = "";
  currentOperator = "";
  displayValue(-1);
}

function deleteNumber() {
  currentInputValue = currentInputValue.slice(0, -1);
  calculatorDisplay.value = calculatorDisplay.value.slice(0, -1);
}

function displayValue(value) {
  // clear display
  if (value === -1) {
    calculatorDisplay.value = "0";
    return;
  }

  if (calculatorDisplay.value === "0") {
    calculatorDisplay.value = value;
    return;
  }

  // Truncate display
  if (calculatorDisplay.value.length > 10) {
    calculatorDisplay.value = calculatorDisplay.value.substring(0, 10) + "...";
    return;
  }

  calculatorDisplay.value += value;
}

function handleNumberButton(value) {
  currentInputValue += value;
  displayValue(value);
}

function handleOperatorButton(value) {
  currentOperator = value;
  prevInputValue = currentInputValue;
  currentInputValue = "";
  calculatorDisplay.value = "";
  displayValue(prevInputValue + " " + value + " ");
}

// Event listeners

numberButtons.forEach((button) =>
  button.addEventListener("click", () => handleNumberButton(button.value))
);

clearButton.addEventListener("click", () => {
  resetDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteNumber();
});

operatorButtons.forEach((operatorButton) =>
  operatorButton.addEventListener("click", () =>
    handleOperatorButton(operatorButton.value)
  )
);

equalButton.addEventListener("click", () => {
  if (!currentInputValue || !currentOperator || !prevInputValue) {
    return;
  }
  result = operate(currentOperator, prevInputValue, currentInputValue);
  resetDisplay();
  currentInputValue = result;
  displayValue(currentInputValue);
});

dotButton.addEventListener("click", (e) => {
  currentInputValue += e.target.value;
  calculatorDisplay.value = "";
  displayValue(currentInputValue);
});
