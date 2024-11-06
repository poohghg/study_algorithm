/**
 * 계단오르기
 * 철수는 계단을 오를 때 한 번에 한 계단 또는 두 계단씩 올라간다. 만약 총 4계단을 오른다면 그 방법의 수는
 * 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2 로 5가지이다.
 * 그렇다면 총 N계단일 때 철수가 올라갈 수 있는 방법의 수는 몇 가지인가?
 */
function solution_1(n) {
  const dy = Array.from({ length: n + 1 }, () => 0);
  dy[0] = 0;
  dy[1] = 1;
  dy[2] = 2;
  for (let i = 3; i <= n; i++) {
    dy[i] = dy[i - 1] + dy[i - 2];
  }
  return dy[n];
}
// console.log(solution_1(7));

/**
 * 최대 부분 증가수열
 * N개의 자연수로 이루어진 수열이 주어졌을 때, 그 중에서 가장 길게 증가하는(작은 수에서 큰 수로)
 * 원소들의 집합을 찾는 프로그램을 작성하라. 예를 들어, 원소가 2, 7, 5, 8, 6, 4, 7, 12, 3
 * 이면 가장 길게 증가하도록 원소들을 차례대로 뽑아내면 2, 5, 6, 7, 12를 뽑아내어
 * 길 이가 5인 최대 부분 증가수열을 만들 수 있다.
 */
function solution_2(n, arr) {
  // dy는 자기자신이 우항이되는 최대증가수열
  const dy = Array(n).fill(0);
  dy[0] = 1;
  for (let i = 1; i < arr.length; i++) {
    let max = 0;
    for (let j = i - 1; 0 <= j; j--) {
      if (arr[j] < arr[i] && max < dy[j]) max = dy[j];
    }
    dy[i] = max + 1;
  }
  return Math.max(...dy);
}
// console.log(solution_2(9, [2, 7, 5, 15, 6, 4, 7, 12, 3]));

/**
 * 동전교환(냅색 알고리즘)
 * 다음과 같이 여러 단위의 동전들이 주어져 있을때 거스름돈을 가장 적은 수의 동전으로
 * 교환 해주려면 어떻게 주면 되는가? 각 단위의 동전은 무한정 쓸 수 있다.
 */

function solution_3(n, coins, m) {
  // i금액을 거슬러 줄 최소 동전의 개수
  const dy = Array(m + 1);
  dy[0] = 0;
  for (const coin of coins) {
    for (let i = coin; i <= m; i++) {
      dy[i] = Math.min(dy[i - coin] + 1, dy[i]);
    }
  }
}

// console.log(solution_3(3, [1, 2, 5], 15));
