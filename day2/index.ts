import { sanitizeInput } from '../utils/sanitize';
import input from './input.txt';
const lines = sanitizeInput(input);

const maxTiles = {
  red: 12,
  green: 13,
  blue: 14
}

const part1 = lines.reduce((prev, line) => {
  const id = line.match(/(?<=Game )\d+/)?.[0] || '0';
  const blues = line.match(/\d+(?=( blue))/g);
  const greens = line.match(/\d+(?=( green))/g);
  const reds = line.match(/\d+(?=( red))/g);

  const invalidGame = blues?.some(count => +count > maxTiles.blue)
    || greens?.some(count => +count > maxTiles.green)
    || reds?.some(count => +count > maxTiles.red);

  return !invalidGame ? prev + +id : prev;
}, 0);

console.log('Part1:', part1)

const part2 = lines.reduce((prev, line) => {
  const blues = line.match(/\d+(?=( blue))/g) || [];
  const greens = line.match(/\d+(?=( green))/g) || [];
  const reds = line.match(/\d+(?=( red))/g) || [];

  const minBlues = Math.max(...blues.map(Number));
  const minGreens = Math.max(...greens.map(Number));
  const minReds = Math.max(...reds.map(Number));

  return minBlues * minGreens * minReds + prev;
}, 0);

console.log('Part 2:', part2);
