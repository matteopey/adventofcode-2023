const fs = require('fs');

const file = fs.readFileSync('../document.txt', 'ascii');

const lines = file.split('\n');
const textDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const reversedTextDigits = ['eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin'];

/**
 * Traverse string from the left
 * @param {string} array
 * @returns {string}
 */
const leftTraverse = (array) => {
  array = array.replace('\r', '');
  for (let i = 0; i < array.length; i++) {
    const c = array[i];
    if (isDigit(c)) {
      return c;
    }

    // Apply algorithm to find textual digit
    let subStr = '';
    for (let j = i; j < array.length; j++) {
      subStr += array[j];
      const foundIndex = textDigits.findIndex(textDigit => textDigit.startsWith(subStr));

      if (foundIndex > -1) {
        // Compare length
        if (subStr.length === textDigits[foundIndex].length) {
          return (foundIndex + 1).toString();
        }
      } else {
        break;
      }
    }
  }

  return '';
}

/**
 * Traverse string from the right
 * @param {string} array
 * @returns {string}
 */
const rightTraverse = (array) => {
  array = array.replace('\r', '');
  for (let i = array.length - 1; i >= 0; i--) {
    const c = array[i];
    if (isDigit(c)) {
      return c;
    }

    // Apply algorithm to find textual digit
    let subStr = '';
    for (let j = i; j >= 0; j--) {
      subStr += array[j];
      const foundIndex = reversedTextDigits.findIndex(textDigit => textDigit.startsWith(subStr));

      if (foundIndex > -1) {
        // Compare length
        if (subStr.length === reversedTextDigits[foundIndex].length) {
          return (foundIndex + 1).toString();
        }
      } else {
        break;
      }
    }
  }

  return '';
}

const isDigit = (numString) => {
  const digit = Number.parseInt(numString, 10);
  if (digit >= 0 || digit <= 9) {
    return true;
  }

  return false;
}

let sum = 0;
for (const line of lines) {
  let lineDigits = '';

  if (line.length === 0) {
    continue;
  }

  lineDigits += leftTraverse(line);
  lineDigits += rightTraverse(line);

  sum += Number.parseInt(lineDigits);

  console.log(sum);
}

console.log(`Total sum: ${sum}`);
