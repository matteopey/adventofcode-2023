const fs = require('fs');

const isDigit = (numString) => {
  if (numString === undefined) {
    return false;
  }

  const digit = Number.parseInt(numString, 10);
  if (digit >= 0 || digit <= 9) {
    return true;
  }

  return false;
}

const explore = (initialRowIndex, initialColumnIndex, matrix) => {
  let k = initialRowIndex;
  let z = initialColumnIndex;

  if (!matrix[k] || !matrix[k][z]) {
    return undefined;
  }

  let fullNumber = matrix[k][z];

  if (!isDigit(fullNumber)) {
    return undefined;
  }

  // Go left
  z--
  while (isDigit(matrix[k][z])) {
    fullNumber = matrix[k][z] + fullNumber;
    z--;
  }

  // Go right
  z = initialColumnIndex + 1;
  while (isDigit(matrix[k][z])) {
    fullNumber = fullNumber + matrix[k][z];
    z++;
  }

  return {
    fullNumber: fullNumber,
    colIndex: z - 1
  };
}

const file = fs.readFileSync('input.txt', 'ascii');
const lines = file.split('\r\n');

const matrix = [];
for (const line of lines) {
  const matrixRow = [];
  for (let i = 0; i < line.length; i++) {
    matrixRow.push(line[i]);
  }

  matrix.push(matrixRow);
}

const allNumbers = [];
const gearRatios = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    const element = matrix[i][j];

    if (!isDigit(element) && element !== '.') {
      const numbersForElement = [];
      // Look around
      let found = explore(i - 1, j - 1, matrix);
      numbersForElement.push(found?.fullNumber);

      if (found === undefined || found.colIndex < j) {
        found = explore(i - 1, j, matrix);
        numbersForElement.push(found?.fullNumber);
      }

      if (found === undefined || found?.colIndex < j + 1) {
        found = explore(i - 1, j + 1, matrix);
        numbersForElement.push(found?.fullNumber);
      }

      found = explore(i, j - 1, matrix);
      numbersForElement.push(found?.fullNumber);

      if (found === undefined || found?.colIndex < j) {
        found = explore(i, j, matrix);
        numbersForElement.push(found?.fullNumber);
      }

      if (found === undefined || found?.colIndex < j + 1) {
        found = explore(i, j + 1, matrix);
        numbersForElement.push(found?.fullNumber);
      }

      found = explore(i + 1, j - 1, matrix);
      numbersForElement.push(found?.fullNumber);

      if (found === undefined || found?.colIndex < j) {
        found = explore(i + 1, j, matrix);
        numbersForElement.push(found?.fullNumber);
      }

      if (found === undefined || found?.colIndex < j + 1) {
        found = explore(i + 1, j + 1, matrix);
        numbersForElement.push(found?.fullNumber);
      }

      allNumbers.push(...numbersForElement);

      const cleanNumbersForElement = numbersForElement.filter(num => num !== undefined);
      if (cleanNumbersForElement.length === 2) {
        const gearRatio = cleanNumbersForElement
          .map(num => Number.parseInt(num))
          .reduce((prev, curr) => prev * curr);

        gearRatios.push(gearRatio);
      }
    }
  }
}

const sum = allNumbers
  .filter(num => num !== undefined)
  .map(num => Number.parseInt(num))
  .reduce((prev, curr) => prev + curr);

console.log('sum is: ', sum);

const gearRatioSum = gearRatios.reduce((prev, curr) => prev + curr);

console.log('gear ration sum is: ', gearRatioSum);