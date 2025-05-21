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
console.log(superDigit('9875', 4));
