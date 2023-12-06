const fs = require('fs');

const file = fs.readFileSync('../input.txt', 'ascii');
const lines = file.split('\r\n');

let total = 0;
const cardsTotals = new Array(lines.length).fill(0);
let cardsWonTotal = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const numberLists = line.split(":")[1].split("|");

  const winningList = numberLists[0].split(' ').filter(x => x !== '');
  const ownList = numberLists[1].split(' ').filter(x => x !== '');;

  let copiesWon = 0;
  for (const winningNumber of winningList) {
    if (ownList.includes(winningNumber)) {
      copiesWon++;
    }
  }

  if (copiesWon > 0) {
    total = total + 2 ** (copiesWon - 1);
  }

  cardsTotals[i]++;

  let j = i + 1;
  while (j <= i + copiesWon) {
    cardsTotals[j] += cardsTotals[i];
    j++;
  }

  cardsWonTotal += cardsTotals[i];
}

console.log('total won:', total);
console.log('total cards won:', cardsWonTotal);

// total won: 24733
// total cards won: 5422730