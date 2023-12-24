import { sanitizeInput } from '../utils/sanitize';
import input from './input.txt';

const lines = sanitizeInput(input);

const part1 = lines.reduce((prev, curr) => {
  const digits = curr.match(/\d/g) ?? [];
  const first = digits[0];
  const last = digits[digits.length - 1];
  const calibration = `${first}${last}`;
  return calibration ? prev + Number(calibration) : prev;
}, 0);
console.log('Part 1:', part1)


const spelledDigits: Record<string, string | string[]> = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'twone': ['2', '1'],
  'oneight': ['1', '8'],
  'threeight': ['3', '8'],
  'fiveight': ['5', '8'],
  'nineight': ['9', '8'],
  'eightwo': ['8', '2'],
  'sevenine': ['7', '9']
}

const regex = new RegExp(`twone|oneight|threeight|fiveight|nineight|eightwo|${Object.keys(spelledDigits).join('|')}|\\d`, 'g');
const part2 = lines.reduce((prev, curr) => {
  const digits = curr.match(regex) ?? ['0', '0'];
  const first = digits[0]; 
  const last = digits[digits.length - 1];
  const firstAsDigit = isNaN(+first)
    ? Array.isArray(spelledDigits[first])
      ? spelledDigits[first][0]
      : spelledDigits[first]
    : first;
  const lastAsDigit = isNaN(+last) 
    ? Array.isArray(spelledDigits[last])
      ? spelledDigits[last][1]
      : spelledDigits[last]
    : last;
  const calibration = `${firstAsDigit}${lastAsDigit}`;  
  return calibration ? prev + Number(calibration) : prev;
}, 0);
console.log('Part 2:', part2)
