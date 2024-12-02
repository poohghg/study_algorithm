export default {};

/**
 * 동전 0
 * https://www.acmicpc.net/problem/11047
 * 준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.
 * 동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.
 * 첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)
 * 둘째 줄부터 N개의 줄에 동전의 가치 Ai가 오름차순으로 주어진다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)
 */
const solution1 = (coins: number[], totalSum: number): number => {
  const candidateCoins = coins
    .filter((coin) => coin < totalSum)
    .sort((a, b) => b - a);

  let rest = totalSum;
  let result = 0;

  for (let i = 0; i < candidateCoins.length; i++) {
    if (rest === 0) break;
    if (candidateCoins[i] > rest) continue;

    result += Math.floor(rest / candidateCoins[i]);
    rest = rest % candidateCoins[i];
  }

  return result;
};

// console.log(
//   solution1([1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000], 4790),
// );

/**
 * ATM
 * https://www.acmicpc.net/problem/11399
 * 첫째 줄에 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 출력한다.
 */

const solution2 = (arr: number[]): number => {
  const sorted = arr.sort((a, b) => a - b);

  let waitTime = 0;
  let prefixSum = 0;

  for (const time of sorted) {
    waitTime += time;
    prefixSum += waitTime;
  }

  return prefixSum;
};

console.log(solution2([3, 1, 4, 3, 2]));
