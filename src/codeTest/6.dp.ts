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

const map = [
  [1, 3, 3, 2],
  [2, 1, 4, 1],
  [1, 5, 2, 3],
];

console.log(LIS_MAP(map));
