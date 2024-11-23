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

console.log(
  solution1(
    [10, 20, 30, 40, 50],
    [
      [1, 3],
      [2, 4],
      [3, 5],
      [1, 5],
      [4, 4],
    ],
  ),
);
