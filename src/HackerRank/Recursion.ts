export default {};

/**
 https://www.hackerrank.com/challenges/the-power-sum/problem?isFullScreen=true
 * Find the number of ways that a given integer,
 * can be expressed as the sum of the powers of unique, natural numbers.
 */

function powerSum(X: number, N: number): number {
  // 조합을 구한다?
  const x = Math.floor(Math.sqrt(X));
  const nums = Array.from({ length: x }, (_, idx) => (idx + 1) ** N);

  const getCombine = () => {
    let count = 0;

    const dfs = (start: number, sum: number) => {
      if (X <= sum) {
        if (X === sum) count++;
        return;
      }

      for (let i = start; i < nums.length; i++) {
        dfs(i + 1, sum + nums[i]);
      }
    };

    dfs(0, 0);
    return count;
  };

  return getCombine();
}

// console.log(powerSum(100, 2));

/**
 * https://www.hackerrank.com/challenges/crossword-puzzle/problem?isFullScreen=true
 * A  Crossword grid is provided to you, along with a set of words (or names of places) which need to be filled into the grid. Cells are marked either + or -. Cells marked with a - are to be filled with the word list.
 */

function crosswordPuzzle(crossword: string[], words: string): string[] {
  // Write your code here
  const maps = crossword.map((word) => word.split(''));

  return [''];
}

// console.log(
//   crosswordPuzzle(
//     [
//       '+-++++++++',
//       '+-++++++++',
//       '+-++++++++',
//       '+-----++++',
//       '+-+++-++++',
//       '+-+++-++++',
//       '+++++-++++',
//       '++------++',
//       '+++++-++++',
//       '+++++-++++',
//     ],
//     'LONDON;DELHI;ICELAND;ANKARA',
//   ),
// );

function superDigit(n: string, k: number): number {
  const sumOfString = (s: string) =>
    s.split('').reduce((acc, curr) => acc + parseInt(curr), 0);

  const initNumber = k * sumOfString(n);

  const dfs = (number: number): number => {
    if (number < 10) return number;
    return dfs(sumOfString(number.toString()));
  };

  return dfs(initNumber);
}

// 98759875
// console.log(superDigit('9875', 4));

function journeyToMoon(n: number, astronaut: number[][]): number {
  // Write your code here
  const list = astronaut.reduce(
    (acc, curr) => {
      const [id1, id2] = curr;
      acc[id1] ? acc[id1].push(id2) : (acc[id1] = [id2]);
      acc[id2] ? acc[id2].push(id1) : (acc[id2] = [id1]);
      return acc;
    },
    {} as Record<number, number[]>,
  );
  const visited = Array.from({ length: astronaut.length }, () => false);

  const getSameCountryCount = (id: number) => {
    let count = 1;
    visited[id] = true;

    list[id]?.forEach((nextId) => {
      if (!visited[nextId]) count += getSameCountryCount(nextId);
    });

    return count;
  };

  let result = 0;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const size = getSameCountryCount(i);
      result += sum * size;
      sum += size;
    }
  }

  return result;
}

// 0 1 2 3 [0,2] , 1 ,3 -> 1,3 1,0 1,2 3,0 3,2
// console.log(journeyToMoon(4, [[0, 2]]));

function appendAndDelete(s: string, t: string, k: number): string {
  const sameLen = () => {
    const min = Math.min(s.length, t.length);
    for (let i = 0; i < min; i++) {
      if (s[i] !== t[i]) return i;
    }
    return min;
  };

  const dfs = (level: number, str: string) => {
    if (result === 'Yes') return;

    if (level === len) {
      if (str === t) result = 'Yes';
      return;
    }

    // append
    dfs(level + 1, str + t[str.length % tLen]);
    // remove
    dfs(level + 1, str.substring(0, str.length - 1));
  };

  let result: string = 'No';

  const removeCount = s.length - sameLen();
  const len = k - removeCount;
  const tLen = t.length;

  if (len < 0) return result;

  dfs(0, s.substring(0, sameLen()));
  return result;
}

// console.log(appendAndDelete('hackerhappy', 'hackerrank', 9));
// console.log(appendAndDelete('aba', 'aba', 7));
console.log(appendAndDelete('qwerty', 'zxcvbn', 100));
