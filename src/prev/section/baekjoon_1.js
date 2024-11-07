/**
 * 정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 7가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다.
 * 정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.
 */
function solution_1(n) {
  const dy = [];
  dy[1] = 1;
  dy[2] = 2;
  dy[3] = 4;
  //  1,2,3을 더했을때 n이 되는 경우를 구한다.
  // function dp(n) {
  //   if (n <= 3) return dy[n];
  //   return dp(n - 1) + dp(n - 2) + dp(n - 3);
  // }
  for (let i = 4; i <= n; i++) {
    dy[i] = dy[i - 1] + dy[i - 2] + dy[i - 3];
  }
  return dy[n];
}
// console.log(solution_1(4));
/**
 * 2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.
 * 첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.
 * -> 문제: Dy[i] = 2 * i타일링 경우의 수
 * 초기값:쪼개지 않아도 풀 수 있는 작은문제
 */
function solution2(n) {
  const dy = [];
  dy[0] = 0;
  dy[1] = 1;
  dy[2] = 2;
  dy[3] = 3;
  dy[4] = 5;

  for (let i = 3; i <= n; i++) {
    // 파티셔닝
    // 가장오른쪽에 오는 타일의 크기
    dy[i] = dy[i - 2] + dy[i - 1];
  }
  console.log(dy);
  return dy[n] % 10007;
}
// console.log(solution2(9));
/** 계단 오르기
 * 계단 오르는 데는 다음과 같은 규칙이 있다.
 * 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
 * 연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다. 마지막 도착 계단은 반드시 밟아야 한다.
 * 따라서 첫 번째 계단을 밟고 이어 두 번째 계단이나, 세 번째 계단으로 오를 수 있다. 하지만, 첫 번째 계단을 밟고 이어 네 번째 계단으로 올라가거나, 첫 번째, 두 번째, 세 번째 계단을 연속해서 모두 밟을 수는 없다.
 * 각 계단에 쓰여 있는 점수가 주어질 때 이 게임에서 얻을 수 있는 총 점수의 최댓값을 구하는 프로그램을 작성하시오.
 * i 번째 계단에 도착하였을때 얻을수 있는 최대값.
 */
function solution3(n, arr) {
  const dy = Array(n + 1).fill([]);
  dy[1] = [10];
  dy[2] = [20, 30];
  for (let i = 3; i <= arr.length; i++) {
    const score = arr[i - 1];
    dy[i] = [Math.max(...dy[i - 2]) + score, dy[i - 1][0] + score];
  }
  return Math.max(...dy[n]);
}
// console.log(solution3(6, [10, 20, 15, 25, 10, 20]));
/** https://www.acmicpc.net/problem/2156
 * 효주는 포도주 시식회에 갔다. 그 곳에 갔더니, 테이블 위에 다양한 포도주가 들어있는 포도주 잔이 일렬로 놓여 있었다. 효주는 포도주 시식을 하려고 하는데, 여기에는 다음과 같은 두 가지 규칙이 있다.
 * 포도주 잔을 선택하면 그 잔에 들어있는 포도주는 모두 마셔야 하고, 마신 후에는 원래 위치에 다시 놓아야 한다.
 * 연속으로 놓여 있는 3잔을 모두 마실 수는 없다.
 * 효주는 될 수 있는 대로 많은 양의 포도주를 맛보기 위해서 어떤 포도주 잔을 선택해야 할지 고민하고 있다. 1부터 n까지의 번호가 붙어 있는 n개의 포도주 잔이 순서대로 테이블 위에 놓여 있고, 각 포도주 잔에 들어있는 포도주의 양이 주어졌을 때, 효주를 도와 가장 많은 양의 포도주를 마실 수 있도록 하는 프로그램을 작성하시오.
 * 예를 들어 6개의 포도주 잔이 있고, 각각의 잔에 순서대로 6, 10, 13, 9, 8, 1 만큼의 포도주가 들어 있을 때, 첫 번째, 두 번째, 네 번째, 다섯 번째 포도주 잔을 선택하면 총 포도주 양이 33으로 최대로 마실 수 있다.
 */

function solution4(n, arr) {
  const dy = Array(n + 1);
  // 한잔만 마신경우,연속으로 마신경우
  // i번째 올 수 있는경우는
  // 연속으로 마시지 않았을때 최대값
  // 이전잔을 마시고 현재잔을 마셨을대 최대값
  dy[1] = [6];
  dy[2] = [10, 16];
  let max = Math.max(...dy.flat());
  for (let i = 3; i <= arr.length; i++) {
    dy[i] = [Math.max(...dy[i - 2]) + arr[i - 1], dy[i - 1][0] + arr[i - 1]];
    max = Math.max(...dy[i], max);
  }
  return max;
}
// console.log(solution4(6, [6, 10, 13, 9, 8, 1]));

/**
 * 상근이의 여동생 상냥이는 문방구에서 스티커 2n개를 구매했다. 스티커는 그림 (a)와 같이 2행 n열로 배치되어 있다. 상냥이는 스티커를 이용해 책상을 꾸미려고 한다.
 * 상냥이가 구매한 스티커의 품질은 매우 좋지 않다. 스티커 한 장을 떼면, 그 스티커와 변을 공유하는 스티커는 모두 찢어져서 사용할 수 없게 된다.
 * 즉, 뗀 스티커의 왼쪽, 오른쪽, 위, 아래에 있는 스티커는 사용할 수 없게 된다.
 */
function solution5(n, arr) {
  const dy = Array(n + 1).fill([]);
  // 3개의 값을 뽑을수 있음
  // 현재 스티커를 뽑지않는경우
  // 대각선을뽑았을경우 2가지
  dy[1] = [0, arr[0][0], arr[1][0]];
  for (let i = 2; i <= n; i++) {
    dy[i] = [
      Math.max(...dy[i - 1]),
      Math.max(dy[i - 1][0], dy[i - 1][2]) + arr[0][i - 1],
      Math.max(dy[i - 1][0], dy[i - 1][1]) + arr[1][i - 1],
    ];
  }
  console.log(dy);
  return Math.max(...dy[n]);
}
// console.log(
//   solution5(7, [
//     [10, 30, 10, 50, 100, 20, 40],
//     [20, 40, 30, 50, 60, 20, 80],
//   ]),
// );

/**
 * 어떤 동물원에 가로로 두칸 세로로 N칸인 아래와 같은 우리가 있다.
 * 이 동물원에는 사자들이 살고 있는데 사자들을 우리에 가둘 때, 가로로도 세로로도 붙어 있게 배치할 수는 없다.
 * 이 동물원 조련사는 사자들의 배치 문제 때문에 골머리를 앓고 있다.
 * 동물원 조련사의 머리가 아프지 않도록 우리가 2*N 배열에 사자를 배치하는 경우의 수가 몇 가지인지를 알아내는 프로그램을 작성해 주도록 하자. 사자를 한 마리도 배치하지 않는 경우도 하나의 경우의 수로 친다고 가정한다.
 */
function solution6(n) {
  const dy = Array(n).fill([]);

  //경우의 수
  // 현재경우에 놓치않는 경우,
  // 왼쪽,오른쪽에 높을수 있는 경우
  // xx ox xo
  // xx ox xo
  dy[1] = [1, 1, 1];
  for (let i = 2; i <= n; i++) {
    dy[i] = [
      dy[i - 1].reduce((a, b) => a + b, 0),
      dy[i - 1][0] + dy[i - 1][2],
      dy[i - 1][0] + dy[i - 1][1],
    ];
  }
  // console.log(dy);
}
// console.log(solution6(4));

// 계단오르기 백트레깅
// https://www.acmicpc.net/problem/2579
function solution7(n, arr) {
  // dy[idx][0] = 이전계단을 밝고온 값
  // dy[idx][1] = 이전 계단을 밝지 않고온 값
  const dy = Array.from({ length: n + 1 }, () => []);
  const come = Array.from({ length: n }, () => []);
  dy[0] = [0, 0];
  dy[1] = [0, 10];
  dy[2] = [20, 30];

  come[0] = [0, 0, 0];
  come[1] = [[-2, 0], -1, 10];
  come[2] = [[-2, 0], -1, 20];

  for (let i = 3; i <= arr.length; i++) {
    dy[i][0] = Math.max(...dy[i - 2]) + arr[i - 1];
    dy[i][1] = dy[i - 1][0] + arr[i - 1];

    const prev = dy[i - 2][0] > dy[i - 2][1] ? 0 : 1;
    come[i] = [[-2, prev], -1, arr[i - 1]];
  }
  console.log(come);
  // console.log(dy);
}
// console.log(solution7(6, [10, 20, 15, 25, 10, 20]));

/**
 * https://www.acmicpc.net/problem/11057
 * 첫째 줄에 길이가 N인 오르막 수의 개수를 10,007로 나눈 나머지를 출력한다.
 * 오르막 수
 * 오르막 수는 수의 자리가 오름차순을 이루는 수를 말한다. 이때, 인접한 수가 같아도 오름차순으로 친다.
 * 예를 들어, 2234와 3678, 11119는 오르막 수이지만, 2232, 3676, 91111은 오르막 수가 아니다.
 * 수의 길이 N이 주어졌을 때, 오르막 수의 개수를 구하는 프로그램을 작성하시오. 수는 0으로 시작할 수 있다.
 */

function solution8(n) {
  // 길이가 i이면 last 수로 끝나는 갯수
  const dy = Array.from({ length: n + 1 }, () => []);
  dy[1] = Array(10).fill(1);
  for (let i = 2; i <= n; i++) {
    let sum = 0;
    for (let j = 0; j <= 9; j++) {
      sum += dy[i - 1][j];
      dy[i][j] = sum % 10007;
    }
  }

  return dy[n].reduce((a, b) => a + b);
}

// console.log(solution8(12));
function solution(n) {
  let answer = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      answer += i;
      if (i !== n / i) answer += n / i;
    }
  }
  return answer;
}
console.log(solution(16));
