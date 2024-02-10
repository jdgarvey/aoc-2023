/**
 * SIMPLE EXAMPLE FOR PERFORMANCE
 */
import input from './input.txt';

const [[seeds], ...groups] = input.split('\n\n').map(group => group.split(':')[1].trim().split('\n'));

const locations = seeds.split(' ').map(Number).map((seed) => {
  return groups.reduce((converted, group) => {
    for (let range of group) {
      const [destination, source, spread] = range.split(' ').map(Number);
      const sourceRangeEnd = source + (spread - 1);
      const offset = source - destination;
      if (converted >= source && converted <= sourceRangeEnd) {
        return converted - offset;
      }
    }

    return converted;
  }, seed);
});

console.log(Math.min(...locations));

// Part 2

type Range = [start: number, end: number];

// get subset of source range that appears in target range
function rangeIn(source: Range, target: Range): Range | null {
  if (source[0] > target[1] || source[1] < target[0]) {
    return null;
  } 
  const start = Math.max(source[0], target[0]);
  const end = Math.min(source[1], target[1]);
  return [start, end];
}

const seedRanges = seeds.split(' ').map(Number).reduce((result: Range[], number, i, s) => {
  return i % 2 === 0 
    ? [...result, [number, number + s[i + 1] - 1]] as Range[]
    : result
}, []);

const part2 = seedRanges.map((seedRange) => {
  return groups.reduce((converted, group) => {
    let results: Range[] = [];
    group.forEach(range => {
      converted.forEach(convertedRange => {
        const [destination, source, spread] = range.split(' ').map(Number);
        const sourceRange = [source, source + (spread - 1)];
        const offset = source - destination;
        const result = rangeIn(convertedRange, sourceRange);
        if (result) {
          const destRange = {start: result.start - offset, end: result.end - offset};
          results.push(destRange);
        } else {
          results.push(convertedRange)
        }
      });
    });
    console.log(results)
    return results;
  }, [seedRange]);
});

// const part2 = allSeeds.map((seed) => {
//   return groups.reduce((converted, group) => {
//     for (let range of group) {
//       const [destination, source, spread] = range.split(' ').map(Number);
//       const sourceRangeEnd = source + (spread - 1);
//       const offset = source - destination;
//       if (converted >= source && converted <= sourceRangeEnd) {
//         return converted - offset;
//       }
//     }

//     return converted;
//   }, seed);
// });

// console.log(Math.min(...part2));
