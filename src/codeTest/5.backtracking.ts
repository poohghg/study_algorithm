export default {};

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

console.log(
  canPlaceSecurityCameras(4, [
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
    [0, 0, 1, 0],
  ]),
);

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
