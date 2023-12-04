const fs = require('fs');

const file = fs.readFileSync('../input.txt', 'ascii');
const lines = file.split('\r\n');

const TOTAL_CUBES = {
  'red': 12,
  'green': 13,
  'blue': 14
};

const validGames = [];
const powersOfSets = [];
for (const line of lines) {
  const game = line.split(':')[0];
  const sets = line.split(':')[1];

  const id = game.split(' ')[1];

  const highestValues = {
    'red': 0,
    'green': 0,
    'blue': 0
  };

  let setValid = true;
  const allSets = sets.split('; ');
  for (const set of allSets) {
    const throws = set.trim().split(", ");

    let throwValid = true;

    for (const tr of throws) {
      const splitted = tr.trim().split(' ');
      const numberOfCubes = Number.parseInt(splitted[0]);
      const color = splitted[1];

      if (numberOfCubes > highestValues[color]) {
        highestValues[color] = numberOfCubes;
      }

      if (numberOfCubes > TOTAL_CUBES[color]) {
        throwValid = false;
      }
    }

    setValid = setValid && throwValid;
  }

  if (setValid) {
    validGames.push(id);
  }

  powersOfSets.push(highestValues.blue * highestValues.green * highestValues.red);
}

console.log(`Valid games: ${validGames}`);

const sum = validGames
  .map(x => Number.parseInt(x))
  .reduce((prev, curr) => prev + curr);

console.log(`sum is: ${sum}`);

const powerSum = powersOfSets
  .reduce((prev, curr) => prev + curr);

console.log(`powerSum is: ${powerSum}`);