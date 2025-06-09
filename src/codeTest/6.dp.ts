export default {};

const LIS = (arr: number[]): number => {
  const n = arr.length;
  const dp = Array(n).fill(0);
  dp[0] = 1;

  for (let i = 1; i < n; i++) {
    const currentValue = arr[i];
    let max = 1;

    for (let j = 0; j < i; j++) {
      if (arr[j] < currentValue) {
        max = Math.max(dp[j] + 1, max);
      }
    }
    dp[i] = max;
  }

  return Math.max(...dp);
};

// console.log(LIS([1, 4, 2, 3, 1, 5, 7, 3]));

const LIS_MAP = (arr: number[][]) => {
  const n = arr[0].length;
  const dp = Array.from(Array(4), () => Array(n).fill(0));

  // 각 패턴은 아래 처럼 정의가능하다.
  // 1.위 2.중간 3.아래 4.위 아래
  dp[0][0] = arr[0][0];
  dp[1][0] = arr[1][0];
  dp[2][0] = arr[2][0];
  dp[3][0] = arr[0][0] + arr[2][0];

  for (let i = 1; i < n; i++) {
    const prevIdx = i - 1;
    // 패턴1
    dp[0][i] = arr[0][i] + Math.max(dp[1][prevIdx], dp[2][prevIdx]);
    // 패턴2
    dp[1][i] =
      arr[1][i] + Math.max(dp[0][prevIdx], dp[2][prevIdx], dp[3][prevIdx]);
    // 패턴3
    dp[2][i] = arr[2][i] + Math.max(dp[0][prevIdx], dp[1][prevIdx]);
    // 패턴4
    dp[3][i] = arr[0][i] + arr[2][i] + dp[1][prevIdx];
  }

  return Math.max(...dp.map((row) => row[n - 1]));
};

// const map = [
//   [1, 3, 3, 2],
//   [2, 1, 4, 1],
//   [1, 5, 2, 3],
// ];
//
// console.log(LIS_MAP(map));

/**
 * 가로 길이가 2이고 세로의 길이가 1인 직사각형모양의 타일이 있습니다.
 * 이 직사각형 타일을 이용하여 세로의 길이가 2이고 가로의 길이가 n인 바닥을 가득 채우려고 합니다. 타일을 채울 때는 다음과 같이 2가지 방법이 있습니다.
 * 타일을 가로로 배치 하는 경우
 * 타일을 세로로 배치 하는 경우
 */
const n2 = (n: number) => {
  const dp = Array(n).fill(0);

  dp[0] = 1;
  dp[1] = 2;
  dp[2] = 3;

  for (let i = 3; i < n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
  }

  return dp[n - 1];
};

// console.log(n2(4));

const n22 = (arr: number[][]) => {
  const n = arr.length;
  const dp = Array.from({ length: n }, (): number[] => []);
  dp[0] = arr[0];
  dp[1] = arr[1].map((v) => v + dp[0][0]);

  for (let i = 2; i < n; i++) {
    const currentArr = arr[i];
    const m = currentArr.length;
    for (let j = 0; j < m; j++) {
      const value = currentArr[j];
      if (j === 0) {
        dp[i][j] = value + dp[i - 1][j];
      } else if (j === m - 1) {
        dp[i][j] = value + dp[i - 1][j - 1];
      } else {
        dp[i][j] = value + Math.max(dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }

  return Math.max(...dp[n - 1]);
};

// console.log(n22([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]));

const getMoney = (money: number[]) => {
  const n = money.length;
  const dp1 = Array(n).fill(0);

  dp1[0] = money[0];
  dp1[1] = money[0];

  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
  }

  const dp2 = Array(n).fill(0);

  dp2[0] = 0;
  dp2[1] = money[1];

  for (let i = 2; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
  }

  return Math.max(dp1[n - 2], dp2[n - 1]);
};

// console.log(getMoney([1, 2, 3, 1]));
// console.log(getMoney([1, 1, 4, 1, 4])); //8 // [1,4]/
// console.log(getMoney([1, 10, 100, 1000])); // 100
// console.log(getMoney([10, 1000, 100, 1])); // 100
// console.log(getMoney([1000, 0, 0, 1000, 0, 0, 1000, 0, 0, 1000])); // 3000

const getBoard = (board: number[][]) => {
  const row = board.length;
  const col = board[0].length;

  const safeParseValue = (x: number, y: number) => {
    return board[x]?.[y] ?? 0;
  };

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // 확장 가능하다면 ?
      if (board[i][j] === 1) {
        const up = safeParseValue(i - 1, j);
        const upLeft = safeParseValue(i - 1, j - 1);
        const left = safeParseValue(i, j - 1);
        board[i][j] = Math.min(up, upLeft, left) + 1;
      }
    }
  }

  const maxValue = Math.max(...board.map((x) => Math.max(...x)));
  return maxValue * maxValue;
};

console.log(
  getBoard([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ]),
);
