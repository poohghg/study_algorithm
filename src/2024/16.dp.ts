export default {};

/**
 * https://www.acmicpc.net/problem/1003
 */
const solution1 = (n: number) => {
  const dy: ([number, number] | undefined)[] = Array(n + 1);
  dy[0] = [1, 0];
  dy[1] = [0, 1];

  const dp = (n: number): [number, number] => {
    if (dy[n]) return dy[n];

    const n1 = dp(n - 1);
    const n2 = dp(n - 2);

    dy[n] = [n1[0] + n2[0], n1[1] + n2[1]];

    return dy[n];
  };

  return dp(n);
};

// console.log(solution1(22));

/**
 * https://www.acmicpc.net/problem/1904
 * 지원이에게 2진 수열을 가르쳐 주기 위해, 지원이 아버지는 그에게 타일들을 선물해주셨다. 그리고 이 각각의 타일들은 0 또는 1이 쓰여 있는 낱장의 타일들이다.
 * 어느 날 짓궂은 동주가 지원이의 공부를 방해하기 위해 0이 쓰여진 낱장의 타일들을 붙여서 한 쌍으로 이루어진 00 타일들을 만들었다. 결국 현재 1 하나만으로 이루어진 타일 또는 0타일을 두 개 붙인 한 쌍의 00타일들만이 남게 되었다.
 * 그러므로 지원이는 타일로 더 이상 크기가 N인 모든 2진 수열을 만들 수 없게 되었다. 예를 들어, N=1일 때 1만 만들 수 있고, N=2일 때는 00, 11을 만들 수 있다. (01, 10은 만들 수 없게 되었다.) 또한 N=4일 때는 0011, 0000, 1001, 1100, 1111 등 총 5개의 2진 수열을 만들 수 있다.
 * 우리의 목표는 N이 주어졌을 때 지원이가 만들 수 있는 모든 가짓수를 세는 것이다. 단 타일들은 무한히 많은 것으로 가정하자.
 *
 */

const solution2 = (n: number) => {
  const dy = Array.from({ length: n + 1 }, () => 0);
  dy[0] = 0;
  dy[1] = 1;
  dy[2] = 2;

  for (let i = 3; i <= n; i++) {
    dy[i] = dy[i - 1] + dy[i - 2];
  }

  return dy[n];
};

// console.log(solution2(4));

/**
 * https://www.acmicpc.net/problem/2156
 * 연속으로 놓여 있는 3잔을 모두 마실 수는 없다.
 */

const solution3 = (nums: number[]) => {
  const dp = Array.from({ length: nums.length }, () => 0);

  dp[0] = nums[0];
  dp[1] = nums[0] + nums[1];
  dp[2] = Math.max(dp[1], nums[2] + nums[1], nums[2] + nums[0]);

  for (let i = 3; i < nums.length; i++) {
    const num = nums[i];
    const prevNum = nums[i - 1];
    // 1. 현재 안마시기
    // 현재 인덱스를 무조건 먹는 경우의수 2가지
    // 2. 현재 마시고 + dp[-2] 최적의해 마시기
    // 3. 현재 마시고 + 이전꺼 마시고, dp[-3] 최적의해 마시기

    dp[i] = Math.max(dp[i - 1], num + dp[i - 2], num + prevNum + dp[i - 3]);
  }

  return Math.max(...dp);
};

console.log(solution3([6, 10, 13, 9, 8, 1]));
