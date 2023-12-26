import { sanitizeInput } from '../utils/sanitize';
import input from './input.txt';

const lines = sanitizeInput(input);

const part1 = lines.reduce((total, line) => {
  const [card, winners, entries] = line.split(/:|\|/)
  const winnersList = winners.split(' ').filter(Boolean);
  const entriesList = entries.split(' ').filter(Boolean);
  const cardWinners = entriesList.filter(number => winnersList.includes(number));
  const score = Math.floor(Math.pow(2, cardWinners.length - 1));
  return total + score;
}, 0);

console.log(part1);

// part 2
const part2 = lines.reduce((state, line, index) => {
  const [_, winners, entries] = line.split(/:|\|/);
  const winnersList = winners.split(' ').filter(Boolean);
  const entriesList = entries.split(' ').filter(Boolean);
  const matchesCount = entriesList
    .filter(number => winnersList.includes(number))
    .length;

  const currentCardCount = (state[index] || 0) + 1;

  for (let i = index + 1; i <= index + matchesCount; i++) {
    state[i] = (state[i] || 0) + currentCardCount;
  }
  
  return {...state, total: state.total + currentCardCount};
}, {total: 0} as Record<string | number, number>);

console.log('part 2: ', part2.total)
