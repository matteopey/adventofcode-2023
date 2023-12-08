const fs = require('fs');
const { performance } = require('perf_hooks');

/**
 * Read map from input
 * @param {string[]} lines
 * @param {number} mapStartingIndex
 * @returns {number[][]}
 */
const readInputMap = (lines, mapStartingIndex) => {
  const map = [];
  for (let i = mapStartingIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) {
      break;
    }

    const lineNumbers = line.split(' ')
      .filter(x => x !== '')
      .map(x => Number.parseInt(x));

    map.push(lineNumbers);
  }

  return map;
}

/**
 * Return the location given a seed
 * @param {number} seed
 * @returns {number}
 */
const findLocationForSeed = (seed) => {
  // Find the range into which the seed is present
  let valueToSearch = seed;
  for (const map of maps) {
    for (const line of map) {
      const destinationRangeStart = line[0];
      const sourceRangeStart = line[1];
      const length = line[2];

      // The value to search is for sure inside only one range
      const sourceRangeMax = sourceRangeStart + length - 1;
      if (sourceRangeStart <= valueToSearch && valueToSearch <= sourceRangeMax) {
        // Given that the values inside the range are just single digit increase, the difference between the value we have
        // and the start of that range, is the number of "steps" to do from the destination range start to get the final
        // destination value.
        const numbersToAdd = valueToSearch - sourceRangeStart;
        valueToSearch = destinationRangeStart + numbersToAdd;
        break;
      }
    }
  }

  return valueToSearch;
}

/**
 * Return the closest location given a list of seeds
 * @param {number[]} seeds
 * @returns {number}
 */
const findClosestLocation = (seeds) => {
  let closestLocation = Number.MAX_VALUE;
  for (const seed of seeds) {
    const valueToSearch = findLocationForSeed(seed);

    if (valueToSearch < closestLocation) {
      closestLocation = valueToSearch;
    }
  }

  return closestLocation;
}

const file = fs.readFileSync('../input.txt', 'ascii');
const lines = file.split("\r\n");

// Parse the input maps into arrays of numbers
const maps = [
  readInputMap(lines, lines.indexOf("seed-to-soil map:")),
  readInputMap(lines, lines.indexOf("soil-to-fertilizer map:")),
  readInputMap(lines, lines.indexOf("fertilizer-to-water map:")),
  readInputMap(lines, lines.indexOf("water-to-light map:")),
  readInputMap(lines, lines.indexOf("light-to-temperature map:")),
  readInputMap(lines, lines.indexOf("temperature-to-humidity map:")),
  readInputMap(lines, lines.indexOf("humidity-to-location map:")),
]

const seeds = lines[0].split(':')[1].split(' ')
  .filter(x => x !== '')
  .map(x => Number.parseInt(x));

let startTime = performance.now();
// right answer: 35/1181555926
// runs in 5ms
console.log('closest location part 1:', findClosestLocation(seeds))
let endTime = performance.now();
console.log('time to run: %dms', endTime - startTime);

// part 2
const startTimeP2 = performance.now();
let closestLocation = Number.MAX_VALUE;
for (let i = 0; i < seeds.length; i += 2) {
  const startSeedRange = seeds[i];
  const length = seeds[i + 1];

  for (let j = 0; j < length; j++) {
    const locationForSeed = findLocationForSeed(startSeedRange + j);

    if (locationForSeed < closestLocation) {
      closestLocation = locationForSeed;
    }
  }
}
const endTimeP2 = performance.now();

// right answer: 46/37806486
// runs in 350s
console.log('closest location part 2:', closestLocation);
console.log('time to run: %dms', endTimeP2 - startTimeP2);