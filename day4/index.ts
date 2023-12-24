import { sanitizeInput } from '../utils/sanitize';
import input from './input.txt';

const lines = sanitizeInput(input);

const part1 = lines.reduce((total, line) => {
  const [card, winners, entries] = line.split(/:|\|/)
  const winnersList = winners.split(' ').filter(Boolean);
  const entriesList = entries.split(' ').filter(Boolean);
  const cardWinners = entriesList.filter(number => winnersList.includes(number));
  const score = Math.floor(Math.pow(2, cardWinners.length - 1));
  // console.group(
  //   card,
  //   winnersList,
  //   entriesList,
  //   cardWinners,
  //   score
  // )
  return total + score;
}, 0);

console.log(part1);
