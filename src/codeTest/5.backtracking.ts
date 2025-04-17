export default {};

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

console.log(
  solution2([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]),
);

// console.log(solution1(5));
