export {};

/**
 * 누적합
 * N개의 수 A1, A2, ..., AN이 입력으로 주어진다. 총 M개의 구간 i, j가 주어졌을 때, i번째 수부터 j번째 수까지 합을 구하는 프로그램을 작성하시오.
 * 10 20 30 40 50
 * 1 3
 * 2 4
 * 3 5
 * 1 5
 * 4 4
 */

const solution1 = (arr: number[], ranges: [number, number][]) => {
  const getPrefixSum = (arr: number[]) => {
    let sum = 0;

    return arr.reduce(
      (acc, curr) => {
        sum += curr;
        acc.push(sum);
        return acc;
      },
      [0],
    );
  };

  const prefixSums = getPrefixSum(arr);

  return ranges.map(
    ([left, right]) => prefixSums[right] - prefixSums[left - 1],
  );
};

// console.log(
//   solution1(
//     [10, 20, 30, 40, 50],
//     [
//       [1, 3],
//       [2, 4],
//       [3, 5],
//       [1, 5],
//       [4, 4],
//     ],
//   ),
// );

// https://www.acmicpc.net/problem/10986
const solution2 = (m: number, arr: number[]) => {
  const getPrefixSum = (arr: number[]) => {
    let sum = 0;

    return arr.reduce(
      (acc, curr) => {
        sum += curr;
        acc.push(sum);
        return acc;
      },
      [0],
    );
  };

  const prefixSums = getPrefixSum(arr);
  const n = arr.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    const leftSum = prefixSums[i];

    for (let j = i + 1; j <= n; j++) {
      const num = prefixSums[j] - leftSum;
      if (num % 3 === 0) result++;
    }
  }

  return result;
};

// console.log(solution2(3, [1, 2, 3, 1, 2]));

//https://www.acmicpc.net/problem/2167
const solution3 = (arr: number[][]) => {
  const getSafeArrayValue =
    <T>(arr: T[][]) =>
    (x: number, y: number) =>
      arr?.[x]?.[y] ?? 0;

  const prefixSums = () => {
    let result: number[][] = Array.from({ length: n }, () =>
      new Array(m).fill(0),
    );

    const getValue = getSafeArrayValue(result);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        result[i][j] =
          arr[i][j] +
          getValue(i - 1, j) +
          getValue(i, j - 1) -
          getValue(i - 1, j - 1);
      }
    }

    return result;
  };

  const query = (i: number, j: number, x: number, y: number) => {
    const getValue = getSafeArrayValue(sums);

    return (
      sums[x][y] -
      getValue(x, j - 1) -
      getValue(i - 1, y) +
      getValue(i - 1, j - 1)
    );
  };

  const n = arr.length;
  const m = arr[0]?.length ?? 0;
  const sums = prefixSums();
  console.log(query(1, 1, 2, 2));

  //[
  //   [1, 3, 7],
  //   [6, 18, 37]
  //   [9, 23, 43]
  // ]
};

console.log(
  solution3([
    [1, 2, 4], // 7
    [5, 10, 15], // 30
    [3, 2, 1], //6
  ]),
);

function getMaxProfit(pnl: number[], k: number): number {
  const getPrefixSum = () => {
    return pnl.reduce(
      (acc, curr, index) => {
        acc.push(pnl[index] + acc[index]);
        return acc;
      },
      [0],
    );
  };

  const prefixSum = getPrefixSum();

  const n = pnl.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    const leftSum = prefixSum[i];
    for (let j = i + 1; j <= i + k && j <= n; j++) {
      result = Math.max(result, prefixSum[j] - leftSum);
    }
  }
  return result;
}

// console.log(getMaxProfit([-3, 4, 3, -2, 2, 5], 4)); //8
// console.log(getMaxProfit([-7, -5, -8, -6, -7], 3)); //0
// console.log(getMaxProfit([4, 3, -2, 9, -4, 2, 7, 6], 6)); //18
// console.log(getMaxProfit([2, 5, -7, 8, -6, 4, 1 - 9], 5)); //8
