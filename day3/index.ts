/**
 * GREAT CANDIDATE FOR BENCHMARKING AND REFACTORING
 */

import { sanitizeInput } from '../utils/sanitize';
import input from './input.txt';
const lines = sanitizeInput(input);

const part1 = lines.reduce((totalSum, line, index) => {
  const matches = Array.from(line.matchAll(/(?<=(?<preSymbol>[^\.\d]?))(?<number>\d+)(?=(?<postSymbol>[^\.\d]?))/g));
  return totalSum + matches.reduce((lineSum, match) => {
    const matchIndex = match.index || 0;
    const numberMatch = match.groups?.number || '';

    // Same line match
    if (match.groups?.preSymbol || match.groups?.postSymbol) {
      return lineSum + +numberMatch;
    }
    
    // Defaults
    const numberStartIndex = match.groups?.preSymbol ? matchIndex + 1 : matchIndex;
    const startIndex = numberStartIndex - 1;
    const endIndex = numberStartIndex + numberMatch.length + 1;

    // console.group(
    //   numberMatch,
    //   numberStartIndex,
    //   startIndex,
    //   endIndex
    // )

    // Search previous line if it exists
    if (lines[index - 1]) {
      const previousLineSubstring = lines[index - 1].substring(startIndex, endIndex);
      if (previousLineSubstring.match(/[^\.\d]/)) {
        return lineSum + +numberMatch 
      }
    }
    
    if (lines[index + 1]) {
      const nextLineSubstring = lines[index + 1].substring(startIndex, endIndex);
      if (nextLineSubstring.match(/[^\.\d]/)) {
        return lineSum + +numberMatch 
      }
    }
    
    return lineSum;
  }, 0);
}, 0);

console.log('part1: ', part1)

let total = 0;
lines.forEach((line, lineIndex) => {
  const stars = Array.from(line.matchAll(/\*/g));
  const previousLine = lines[lineIndex - 1];
  const nextLine = lines[lineIndex + 1];

  stars.forEach((star) => {
    const starIndex = star.index as number;

    let topLeftMatch = '';
    let topMatch = '';
    let topRightMatch = '';
    let bottomLeftMatch = '';
    let bottomMatch = '';
    let bottomRightMatch = ''
    let leftMatch = '';
    let rightMatch = '';

    let pointer = starIndex - 1;

    while (line[pointer]?.match(/\d/)) {
      leftMatch = `${line[pointer]}${leftMatch}`
      pointer--;
    }

    pointer = starIndex + 1;

    while (line[pointer]?.match(/\d/)) {
      rightMatch = `${rightMatch}${line[pointer]}`
      pointer++;
    }

    if (previousLine[starIndex].match(/\d/)) {
      topMatch += previousLine[starIndex];
    }

    if (nextLine[starIndex].match(/\d/)) {
      bottomMatch += nextLine[starIndex];
    }

    pointer = starIndex - 1;

    while (previousLine[pointer]?.match(/\d/)) {
      if (topMatch) {
        topMatch = `${previousLine[pointer]}${topMatch}`
      } else {
        topLeftMatch = `${previousLine[pointer]}${topLeftMatch}`;
      }
      pointer--;
    }

    pointer = starIndex + 1;

    while (previousLine[pointer]?.match(/\d/)) {
      if (topMatch) {
        topMatch += previousLine[pointer];
      } else {
        topRightMatch += previousLine[pointer];
      }
      pointer++;
    }

    pointer = starIndex - 1;

    while (nextLine[pointer]?.match(/\d/)) {
      if (bottomMatch) {
        bottomMatch = `${nextLine[pointer]}${bottomMatch}`
      } else {
        bottomLeftMatch = `${nextLine[pointer]}${bottomLeftMatch}`
      }
      pointer--;
    }

    pointer = starIndex + 1;

    while (nextLine[pointer]?.match(/\d/)) {
      if (bottomMatch) {
        bottomMatch += nextLine[pointer];
      } else {
        bottomRightMatch += nextLine[pointer];
      }
      pointer++;
    }

    const validNumbers = [topLeftMatch, topMatch, topRightMatch, bottomLeftMatch, bottomMatch, bottomRightMatch, leftMatch, rightMatch].filter(Boolean);
  
    console.group(
      lineIndex,
      validNumbers
    )

    if (validNumbers.length === 2) {
      total += +validNumbers[0] * +validNumbers[1];
    }
  });
});
console.log('part2:', total);

