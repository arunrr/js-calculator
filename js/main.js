function isNumberValid(value) {
  if (isNaN(value)) {
    return 0;
  }
  return 1;
}

function convertToValidNumber(value, defaultValue = 0) {
  let convertedValue = parseInt(value);

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

function division(firstNumber, secondNumber) {
  const convertedFirstNumber = convertToValidNumber(firstNumber, 1);
  const convertedSecondNumber = convertToValidNumber(secondNumber, 1);

  if (convertedSecondNumber === 0) {
    return "Cannot divide by zero";
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
    return "Cannot divide by zero";
  }

  return convertedFirstNumber % convertedSecondNumber;
}
