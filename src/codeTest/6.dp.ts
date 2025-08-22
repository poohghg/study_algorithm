export default {};

function power(m: number, n: number): number {
  if (n === 0) return 1;
  return power(m, n - 1) * 2;
}

// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
// console.log(power(2, 0));
// console.log(power(2, 2));
// console.log(power(2, 4));

function fib(n: number, dp: number[] = []): number {
  if (dp[n]) return dp[n];
  if (n <= 2) {
    dp[n] = 1;
    return 1;
  }

  dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
  return dp[n];
}

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465
// console.log(fib(4));
// console.log(fib(10));
// console.log(fib(28));

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

// console.log(
//   getBoard([
//     [0, 1, 1, 1],
//     [1, 1, 1, 1],
//     [1, 1, 1, 1],
//     [0, 0, 1, 0],
//   ]),
// );

// const findConsistentLogs = (events: number[]) => {};
// console.log(findConsistentLogs([1, 1, 2, 2, 3, 3, 1, 1, 2, 2]));
// console.log(findConsistentLogs([1, 2, 1, 3, 4, 2, 4, 3, 3, 4])); // [1, 2, 1, 3, 4, 2, 4, 3]

// const getMaxProfit = (pnl: number[], k: number): number => {
//   const n = pnl.length;
//   let max = 0;
//
//   for (let i = 0; i < pnl.length; i++) {
//     let sum = 0;
//     for (let j = i; j < pnl.length; j++) {
//       if (j - i === k) break;
//       sum += pnl[j];
//       max = Math.max(max, sum);
//     }
//   }
//
//   return max;
// };

const getMaxProfit = (pnl: number[], k: number): number => {
  const n = pnl.length;

  // 1. 누적합 배열 생성
  const prefixSum: number[] = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + pnl[i];
  }

  let maxProfit = 0;
  // Deque for storing indices of prefixSum in increasing order
  // Deque의 첫 번째 요소는 현재 윈도우 내에서 가장 작은 prefixSum을 가진 인덱스.
  const deque: number[] = []; // Using a plain array as a deque (push/shift/pop/unshift)

  // 2. 슬라이딩 윈도우 처리
  for (let i = 0; i <= n; i++) {
    while (deque.length > 0 && deque[0] < i - k) {
      deque.shift(); // 윈도우 범위를 벗어난 오래된 인덱스 제거
    }

    // 덱의 뒤쪽에서 현재 prefixSum[i]보다 큰 값들을 제거
    // 왜냐하면, prefixSum[i]는 덱에 추가될 것이고, 그 뒤에 오는 어떤 값도
    // prefixSum[i]보다 작거나 같은 값을 가진 인덱스가 더 좋은 후보가 되기 때문.
    // 가능한 누적합중에 최솟값을 찾는다.
    while (
      deque.length > 0 &&
      prefixSum[deque[deque.length - 1]] >= prefixSum[i]
    ) {
      deque.pop();
    }

    // 현재 인덱스를 덱에 추가
    deque.push(i);

    // 현재 윈도우 내에서 최대 이익 계산
    // prefixSum[i] (현재 끝점)에서 덱의 맨 앞 (윈도우 내 최소 prefixSum)을 뺀다.
    // prefixSum[i]는 (현재)i번째까지의 합이므로, (pnl[0]...pnl[i-1] 합)
    // prefixSum[deque[0]]는 j번째까지의 합이므로 (pnl[0]...pnl[j-1] 합)
    // 뺀 결과는 pnl[j...i-1] 의 합이다.
    if (deque.length > 0 && i > 0) {
      // i=0일 때는 prefixSum[0]만 있으므로 계산 의미 없음
      // prefixSum[i]는 pnl[0]부터 pnl[i-1]까지의 합
      // deque[0]는 pnl[0]부터 pnl[deque[0]-1]까지의 합
      // 따라서 maxProfit = prefixSum[i] - prefixSum[deque[0]]

      if (maxProfit < prefixSum[i] - prefixSum[deque[0]]) {
        maxProfit = prefixSum[i] - prefixSum[deque[0]];
      }

      // maxProfit = Math.max(maxProfit, prefixSum[i] - prefixSum[deque[0]]);
    }
  }

  return maxProfit;
};

// console.log(getMaxProfit([2, 5, -7, 8, -6, 4, 1 - 9], 5)); // Expected output: 8 // [2, 5, -7, 8,]
// console.log(getMaxProfit([1, -1, 1, -1, 10, -1, 1 - 1], 3)); // Expected output: 8 // [2, 5, -7, 8,]
// console.log(getMaxProfit([4, 3, -2, 9, -4, 2, 7, 6], 6)); // Expected output: 20 // [9, -4, 2, 7, 6]
// console.log(getMaxProfit([-7, -5, -8, -6, -7], 3)); // Expected output: 0
// console.log(getMaxProfit([-3, 4, 3, -2, 2, 5], 4)); // Expected output: 8 // [3, -2, 2, 5]

/**
 *  계단 배열 cost와 정수 k가 주어집니다.
 *  당신은 0번 칸에서 시작하여, 한 번에 최대 k칸까지 앞으로 이동할 수 있습니다.
 *  각 칸 i에 도달할 때 cost[i]만큼의 비용이 듭니다.
 *  마지막 칸(cost.length - 1)에 도달할 때까지의 최소 누적 비용을 구하세요.
 */

// const minCostClimbingStairs = (cost: number[], k: number): number => {
//   const n = cost.length;
//   const dp = Array.from({ length: n }, () => Infinity);
//
//   for (let i = 0; i < k; i++) {
//     dp[i] = cost[i];
//   }
//
//   for (let i = k; i < n; i++) {
//     let min = dp[i];
//
//     for (let j = 1; j <= k; j++) {
//       min = Math.min(dp[i - j], min);
//     }
//
//     dp[i] = min + cost[i];
//   }
//
//   return dp[n - 1];
// };

// console.log(minCostClimbingStairs([1, 9, 2, 6, 1], 3)); // Expected output: 3
// console.log(minCostClimbingStairs([10, 15, 20])); // Expected output: 3

// https://school.programmers.co.kr/learn/courses/30/lessons/42898
const puddlesMn = (m: number, n: number, puddles: [number, number][]) => {
  const safeParse = (x: number, y: number): number => {
    return dp?.[x]?.[y] ?? 0;
  };

  const dp = Array.from({ length: n }, () => new Array(m).fill(0));
  dp[0][0] = 1;

  for (const [y, x] of puddles) {
    dp[x - 1][y - 1] = -1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) continue;
      if (dp[i][j] === -1) {
        dp[i][j] = 0;
      } else {
        const top = safeParse(i - 1, j);
        const left = safeParse(i, j - 1);
        dp[i][j] = (top + left) % 1_000_000_007;
      }
    }
  }

  return dp[n - 1][m - 1];
};

// console.log(puddlesMn(4, 3, [[2, 2]]));

// https://school.programmers.co.kr/learn/courses/30/lessons/12983
const matchWord = (strs: string[], t: string) => {
  const n = t.length;
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  const sizes = new Set(strs.map((s) => s.length));

  for (let i = 1; i <= n; i++) {
    for (const size of sizes) {
      if (i >= size && strs.includes(t.slice(i - size, i))) {
        dp[i] = Math.min(dp[i], dp[i - size] + 1);
      }
    }
  }

  return dp[n] === Infinity ? -1 : dp[n];
};

// console.log(matchWord(['ba', 'na', 'n', 'a'], 'banana'));

class PriorityQueue<T> {
  private heap: { value: T; priority: number }[] = [];

  constructor(private compare: (a: number, b: number) => boolean) {}

  push(value: T, priority: number) {
    this.heap.push({ value, priority });
    this.bubbleUp();
  }

  pop(): T | null {
    if (this.isEmpty()) return null;
    const top = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return top.value;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  private bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];
      if (this.compare(element.priority, parent.priority)) {
        this.heap[index] = parent;
        index = parentIdx;
      } else break;
    }

    this.heap[index] = element;
  }

  private bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let swap = -1;

      if (
        leftIdx < length &&
        this.compare(this.heap[leftIdx].priority, element.priority)
      ) {
        swap = leftIdx;
      }

      if (
        rightIdx < length &&
        this.compare(
          this.heap[rightIdx].priority,
          (swap === -1 ? element : this.heap[leftIdx]).priority,
        )
      ) {
        swap = rightIdx;
      }

      if (swap === -1) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }

    this.heap[index] = element;
  }
}

const n1카드게임 = (coin: number, cards: number[]) => {
  const n = cards.length;
  const t = n + 1;
  const roundCards: any[] = [];
  const restCards = cards.slice(n / 3);
  for (let i = 0; i < restCards.length; i++) {
    roundCards.push([restCards[i], restCards[++i]]);
  }

  const canNextRound = (set: Set<number>): [boolean, Set<number>] => {
    for (const n of set) {
      if (set.has(t - n)) {
        set.delete(n);
        set.delete(t - n);
        return [true, set];
      }
    }
    return [false, set];
  };

  const bfs = () => {
    // 0,1,2 장을 뽑을 수 있다.
    const options: [boolean, boolean][] = [
      [false, false],
      [true, false],
      [false, true],
      [true, true],
    ];

    const pq = new PriorityQueue<[Set<number>, number, number]>(
      (a, b) => a > b, // 큰 round 먼저 탐색
    );
    pq.push([new Set(cards.slice(0, n / 3)), 1, 0], 0);

    let result = 1;

    while (!pq.isEmpty()) {
      const [hand, r, cost] = pq.pop()!;
      if (roundCards.length < r) {
        result = Math.max(result, r);
        break;
      }

      const [a, b] = roundCards[r - 1];
      for (const [takeA, takeB] of options) {
        const c = (takeA ? 1 : 0) + (takeB ? 1 : 0);
        if (cost + c > coin) continue;

        const newHand = new Set(hand);
        if (takeA) newHand.add(a);
        if (takeB) newHand.add(b);

        const [can, nextHand] = canNextRound(newHand);
        if (can) {
          pq.push([nextHand, r + 1, cost + c], r + 1);
          result = Math.max(result, r + 1);
        }
      }
    }

    return result;
  };

  return bfs();
};

// console.log(n1카드게임(3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]));
// console.log(n1카드게임(4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]));

// https://school.programmers.co.kr/learn/courses/30/lessons/136797
const solution1 = (numbers: string) => {
  const n = 4;
  const m = 3;

  const padNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['*', 0, '#'],
  ];

  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const diagonalMoves = [
    [1, -1],
    [1, 1],
    [-1, -1],
    [-1, 1],
  ];

  const canMove = (x: number, y: number) => 0 <= x && x < n && 0 <= y && y < m;

  const bfs = (i: number, j: number) => {
    const enqueueMoves = (
      x: number,
      y: number,
      moves: number[][],
      weight: number,
    ) => {
      for (const [dx, dy] of moves) {
        const [nx, ny] = [x + dx, y + dy];
        if (!canMove(nx, ny) || visited[nx][ny] === true) continue;
        queue.push([nx, ny, weight]);
        visited[nx][ny] = true;
        // 다음 거리 까지 확정?
        const target = padNumbers[nx][ny];
        if (typeof target === 'number') {
          dist[start][target] = weight;
        }
      }
    };

    const visited = Array.from({ length: 4 }, () => new Array(3).fill(false));
    const start = padNumbers[i][j] as number;
    dist[start][start] = 1;
    visited[i][j] = true;
    // x,y,cost
    const queue = [[i, j, 0]];

    while (queue.length) {
      const [x, y, cost] = queue.shift()!;
      enqueueMoves(x, y, moves, cost + 2);
      enqueueMoves(x, y, diagonalMoves, cost + 3);
    }
  };

  const dist = Array.from({ length: 10 }, () => new Array(10).fill(Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (typeof padNumbers[i][j] === 'number') {
        bfs(i, j);
      }
    }
  }

  const dp = Array.from({ length: numbers.length + 1 }, () =>
    Array.from({ length: 10 }, () => new Array(10).fill(Infinity)),
  );

  dp[0][4][6] = 0;

  for (let i = 0; i < numbers.length; i++) {
    const num = +numbers[i];
    for (let l = 0; l < 10; l++) {
      for (let r = 0; r < 10; r++) {
        if (dp[i][l][r] === Infinity) continue;
        const cost = dp[i][l][r];
        if (l === num || r === num) {
          dp[i + 1][l][r] = Math.min(dp[i + 1][l][r], cost + 1);
        } else {
          // l을 옮긴다.
          dp[i + 1][num][r] = Math.min(dp[i + 1][num][r], cost + dist[l][num]);
          // r을 옮긴다.
          dp[i + 1][l][num] = Math.min(dp[i + 1][l][num], cost + dist[r][num]);
        }
      }
    }
  }

  let result = Infinity;
  for (let l = 0; l < 10; l++) {
    for (let r = 0; r < 10; r++) {
      result = Math.min(result, dp[numbers.length][l][r]);
    }
  }

  return result;
};

// console.log(solution1('5123513512351351235137894123654877'));

const solution2 = (n: number, lighthouse: number[][]) => {
  const graph = lighthouse.reduce(
    (acc, curr) => {
      const [node1, node2] = curr;
      acc[node1].push(node2);
      acc[node2].push(node1);
      return acc;
    },
    Array.from({ length: n + 1 }, (): number[] => []),
  );
  const order: number[] = [];

  const stack: number[] = [1];
  const visited = Array(n + 1).fill(false);
  while (stack.length) {
    const node = stack.pop()!;
    order.push(node);
    visited[node] = true;

    for (const nextNode of graph[node]) {
      if (!visited[nextNode]) stack.push(nextNode);
    }
  }

  // 0은 자기 자신을 끄는 경우 1은 자기 자신을 키는 경우
  const dp = Array.from({ length: n + 1 }, () => [0, 0]);
  for (let i = n - 1; 0 <= i; i--) {
    const node = order[i];
    dp[node][1] = 1;
    for (const next of graph[node]) {
      dp[node][0] += dp[next][1];
      dp[node][1] += Math.min(...dp[next]);
    }
  }

  const a = Number(5),
    b = Number(3);
  for (let i = 0; i < b; i++) {
    console.log(Array(a).fill('*').join(''));
  }

  return Math.min(...dp[1]);
};

console.log(
  solution2(10, [
    [4, 1],
    [5, 1],
    [5, 6],
    [7, 6],
    [1, 2],
    [1, 3],
    [6, 8],
    [2, 9],
    [9, 10],
  ]),
);
