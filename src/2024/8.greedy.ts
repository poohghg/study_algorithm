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

// console.log(solution2([3, 1, 4, 3, 2]));

/**
 * 읽어버린 괄호
 * https://www.acmicpc.net/problem/1541
 * 세준이는 양수와 +, -, 그리고 괄호를 가지고 식을 만들었다. 그리고 나서 세준이는 괄호를 모두 지웠다.
 * 그리고 나서 세준이는 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다.
 * 괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.
 */
const solution3 = (str: string) => {
  const sum = (s: string): number => {
    return s.split('+').reduce((acc, curr) => {
      return acc + parseInt(curr, 10);
    }, 0);
  };

  const array = str.split('-');
  let result = sum(array[0]);

  for (let i = 1; i < array.length; i++) {
    result -= sum(array[i]);
  }

  return result;
};

// console.log(solution3('55-50+20-40+10-90'));

/**
 * 설탕 배달
 * https://www.acmicpc.net/problem/2839
 * 상근이는 요즘 설탕공장에서 설탕을 배달하고 있다. 상근이는 지금 사탕가게에 설탕을 정확하게 N킬로그램을 배달해야 한다. 설탕공장에서 만드는 설탕은 봉지에 담겨져 있다. 봉지는 3킬로그램 봉지와 5킬로그램 봉지가 있다.
 * 상근이는 귀찮기 때문에, 최대한 적은 봉지를 들고 가려고 한다. 예를 들어, 18킬로그램 설탕을 배달해야 할 때, 3킬로그램 봉지 6개를 가져가도 되지만, 5킬로그램 3개와 3킬로그램 1개를 배달하면, 더 적은 개수의 봉지를 배달할 수 있다.
 * 상근이가 설탕을 정확하게 N킬로그램 배달해야 할 때, 봉지 몇 개를 가져가면 되는지 그 수를 구하는 프로그램을 작성하시오.
 */

// multiple

const solution4 = (num: number): number => {
  const multiple = (m: number) => {
    return (n: number) => n % m === 0;
  };

  const is5Multiple = multiple(5);

  let result = 0;
  let rest = num;

  while (rest >= 3) {
    if (is5Multiple(rest)) {
      result += rest / 5;
      rest = rest % 5;
    } else {
      result += 1;
      rest -= 3;
    }
  }

  return rest !== 0 ? -1 : result;
};

// console.log(solution4(11));

/**
 * A → B
 * https://www.acmicpc.net/problem/16953
 * 정수 A를 B로 바꾸려고 한다. 가능한 연산은 다음과 같은 두 가지이다.
 * 2를 곱한다.
 * 1을 수의 가장 오른쪽에 추가한다.
 */
const solution5 = (a: number, b: number) => {
  // todo 반대로 생각하기
  // 2를 곱한다 > 나누기 2
  // 1을 수의 가장 오른쪽에 추가한다. > 1의 자리를 없엤다.

  const multiple = (m: number) => {
    return (n: number) => n % m === 0;
  };

  const is2Multiple = multiple(2);

  let result = 1;
  let rest = b;

  while (rest > a) {
    if (is2Multiple(rest)) {
      rest = rest / 2;
      result++;
    } else if (rest % 10 === 1) {
      rest = Math.floor(rest / 10);
      result++;
    } else {
      break;
    }
  }

  return rest === a ? result : -1;
};

console.log(solution5(100, 40021));
