export default {};

// https://school.programmers.co.kr/learn/courses/30/lessons/92344
const solution1 = (board: number[][], skill: number[][]) => {
  const n = board.length;
  const m = board[0].length;
  const diffs = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (const [type, r1, c1, r2, c2, degree] of skill) {
    const delta = type === 1 ? -degree : +degree;
    diffs[r1][c1] += delta;
    diffs[r1][c2 + 1] -= delta;
    diffs[r2 + 1][c1] -= delta;
    diffs[r2 + 1][c2 + 1] += delta;
  }

  for (let i = 0; i <= n; i++) {
    let prefixSum = 0;
    for (let j = 0; j <= m; j++) {
      prefixSum += diffs[i][j];
      diffs[i][j] = prefixSum;
    }
  }

  for (let i = 0; i <= m; i++) {
    let prefixSum = 0;
    for (let j = 0; j <= n; j++) {
      prefixSum += diffs[j][i];
      diffs[j][i] = prefixSum;
    }
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (0 < board[i][j] + diffs[i][j]) result++;
    }
  }

  return result;
};

console.log(
  solution1(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [1, 1, 1, 2, 2, 4],
      [1, 0, 0, 1, 1, 2],
      [2, 2, 0, 2, 0, 100],
    ],
  ),
);
