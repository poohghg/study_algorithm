export default {};

//https://leetcode.com/problems/new-21-game/?envType=daily-question&envId=2026-01-11
function new21Game(n: number, k: number, maxPts: number): number {
  // k점 미만일대 뽑는다
  // 종료한 점수가 n 이하일 경우의수는?
  const dp = Array(n + 1).fill(0);
  //
  for (let i = 1; i <= n; i++) {
    // i-1 ~ i-max
    // 1이면 0만더한다.
    // 2이면 1
    // 5라면 4 3 2 1
    // 15라면 14 13 12 11 10 9 8 7 6 5
    for (let j = i - 1; i - maxPts <= j && j <= 1; j--) {}
  }

  // const memo = new Map<number, number>();
  // const r = 1 / maxPts;
  // const dfs = (score: number) => {
  //   if (memo.has(score)) return memo.get(score)!;
  //
  //   if (k <= score) {
  //     return score <= n ? 1 : 0;
  //   }
  //
  //   // 현재점수가 15일대 봅을수 잇는수는 ? // 1 2
  //   let totalScore = 0;
  //   for (let i = score + 1; i <= score + maxPts; i++) {
  //     totalScore += dfs(score + i);
  //   }
  //
  //   memo.set(score, r * totalScore);
  //   return memo.get(score)!;
  // };
  //
  // return dfs(0);
  return 0;
}

// console.log(new21Game(21, 17, 10));
console.log(new21Game(6, 1, 10));
// console.log(new21Game(1, 1, 1));

// /https://leetcode.com/problems/pyramid-transition-matrix/?envType=daily-question&envId=2025-12-29
function pyramidTransition(bottom: string, allowed: string[]): boolean {
  const map = new Map<string, string[]>();

  for (const char of allowed) {
    const key = char.substring(0, 2);
    if (!map.has(key)) map.set(key, []);
    map.get(key)?.push(char[2]);
  }

  const memo = new Map<string, boolean>();

  const dfs = (str: string) => {
    if (memo.has(str)) return memo.get(str);

    const n = str.length;

    if (n === 1) return true;

    for (let i = 0; i < n - 1; i++) {
      if (!map.has(str.substring(i, i + 2))) {
        memo.set(str, false);
        return false;
      }
    }

    const helper = (i: number, curr: string) => {
      // 위 row가 가능한지?
      if (i === n - 1) dfs(curr);
      const front = str.substring(i, i + 2);

      return false;
    };

    // 두개의 검증값
  };

  const bottomFront = bottom.substring(0, 2);
  for (const char of allowed) {
    const front = char.substring(0, 2);
    if (front === bottomFront) {
      console.log(char);
    }
  }

  return false;
}

// console.log(pyramidTransition('AAAA', ['AAB', 'AAC', 'BCD', 'BBE', 'DEF']));
// console.log(pyramidTransition('BCD', ['BCC', 'CDE', 'CEA', 'FFF']));

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const temp: number[] = [];

  const dfs = (level: number, start: number) => {
    result.push([...temp]);

    if (level === nums.length) {
      return;
    }

    for (let i = start; i < nums.length; i++) {
      temp.push(nums[i]);
      dfs(level + 1, i + 1);
      temp.pop();
    }
  };

  dfs(0, 0);
  return result;
}

// console.log(subsets([1, 2, 3]));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/lexicographical-letter-combinations-phone-digits/problem?isFullScreen=true
const minTasksToCancelForNoConflict = (digits: string): string[] => {
  const padMap = new Map<string, string[]>([
    ['2', ['a', 'b', 'c']],
    ['3', ['d', 'e', 'f']],
    ['4', ['g', 'h', 'i']],
    ['5', ['j', 'k', 'l']],
    ['6', ['m', 'n', 'o']],
    ['7', ['p', 'q', 'r', 's']],
    ['8', ['t', 'u', 'v']],
    ['9', ['w', 'x', 'y', 'z']],
    ['0', ['0']],
    ['1', ['1']],
  ]);

  let result: string[] = [];
  const dfs = (level: number = 0, prefix = '') => {
    if (level === digits.length) {
      result.push(prefix);
      return;
    }

    for (const ch of padMap.get(digits[level]) ?? []) {
      dfs(level + 1, prefix + ch);
    }
  };

  dfs(0);
  return result;
};

// console.log(minTasksToCancelForNoConflict('203'));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/place-n-cameras-no-conflict-blocked-grid/problem?isFullScreen=true
const canPlaceSecurityCameras = (N: number, grid: number[][]): boolean => {
  const n = grid.length;
  const records: [number, number][] = [];
  let result = false;

  const isValidPos = (x: number, y: number) => {
    for (const [rx, ry] of records) {
      if (x === rx || y === ry) return false;
      if (Math.abs(x - rx) === Math.abs(y - ry)) return false;
    }
    return true;
  };

  const dfs = (x: number) => {
    if (result) return;

    if (x === N) {
      result = true;
      return;
    }

    for (let y = 0; y < n; y++) {
      if (grid[x][y] === 0 && isValidPos(x, y)) {
        records.push([x, y]);
        dfs(x + 1);
        records.pop();
      }
    }
  };

  dfs(0);
  return result;
};

// console.log(
//   canPlaceSecurityCameras(4, [
//     [0, 1, 0, 0],
//     [0, 0, 0, 1],
//     [1, 0, 0, 0],
//     [0, 0, 1, 0],
//   ]),
// );

const solution1 = (n: number) => {
  const result: number[][] = [];
  const visited: number[] = Array(n).fill(0);
  const dfs = (start: number, sum: number, arr: number[]) => {
    if (sum > 10) return;

    if (sum === 10) {
      result.push([...arr]);
      return;
    }

    for (let i = start; i <= n; i++) {
      dfs(i + 1, sum + i, [...arr, i]);
    }
  };

  dfs(1, 0, []);
  return result;
};

// console.log(solution1(5));

/**
 * 스도쿠 완성하기
 * 1. 가로줄, 세로줄에는 1부터 9까지의 숫자가 한 번씩 나타나야 합니다.
 * 2. g x 9 보드를 채울 9개의 작은 박스(3 x 3 크기)에도 1부터 9까지의 숫자가 한 번씩 나타나야 합니다.
 */
const solution2 = (board: number[][]) => {
  // 백트레킹을 사용한다.
  // 현재 비워있는 포지션을 확인해서 가능한 숫자를 채워준다.

  const inRow = (num: number, x: number) => {
    return board[x].some((v) => v === num);
  };

  const inCol = (num: number, y: number) => {
    return board.some((row) => row[y] === num);
  };

  const inBox = (num: number, x: number, y: number) => {
    const startRow = Math.floor(x / 3) * 3;
    const startCol = Math.floor(y / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) return true;
      }
    }

    return false;
  };

  const isValid = (x: number, y: number, num: number) => {
    return !inRow(num, x) && !inCol(num, y) && !inBox(num, x, y);
  };

  const findEmptyPos = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  };

  const bfs = () => {
    const emptyPos = findEmptyPos();

    if (!emptyPos) return true;
    const [x, y] = emptyPos;

    for (let num = 1; num <= 9; num++) {
      if (isValid(x, y, num)) {
        board[x][y] = num;
        if (bfs()) return true;
        board[x][y] = 0;
      }
    }

    return false;
  };

  return bfs();
};

// console.log(
//   solution2([
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9],
//   ]),
// );

/**
 * n-queen
 * https://school.programmers.co.kr/learn/courses/30/lessons/12952
 */

const solution3 = (n: number) => {
  // 퀸은 가로 세로 대각선에 놓을수 없다.

  const record: [number, number][] = [];
  let result = 0;

  const isValid = (x: number, y: number) => {
    for (const [row, col] of record) {
      if (row === x || col === y) return false;
      if (Math.abs(row - x) === Math.abs(col - y)) return false;
    }
    return true;
  };

  const dfs = (x: number) => {
    if (x === n) {
      result++;
      return;
    }

    for (let y = 0; y < n; y++) {
      if (isValid(x, y)) {
        record.push([x, y]);
        dfs(x + 1);
        record.pop();
      }
    }
  };

  dfs(0);
  return result;
};

// console.log(solution3(4));

const solution4 = (n: number, info: number[]) => {
  function combinationsWithRepetition(arr: number[], n: number) {
    if (n === 1) return arr.map((v) => [v]);
    const result: number[][] = [];

    arr.forEach((fixed, idx, arr) => {
      const rest = arr.slice(idx);
      const combis = combinationsWithRepetition(rest, n - 1);
      const combine = combis.map((v) => [fixed, ...v]);
      result.push(...combine);
    });

    return result;
  }

  const a = combinationsWithRepetition([...Array(11).keys()], n);
};

// console.log(solution4(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
