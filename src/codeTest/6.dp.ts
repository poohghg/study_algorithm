export default {};

function maximalRectangle(matrix: string[][]): number {
  const getWidth = (r: number, c: number) => {
    let k = c - 1;
    let h = dp[r][c];
    let size = h;

    while (0 <= k && 0 < dp[r][k]) {
      const w = c - k + 1;
      h = Math.min(h, dp[r][k]);
      size = Math.max(size, w * h);
      k--;
    }

    return size;
  };

  const n = matrix.length;
  const m = matrix[0].length;
  // 각 높이를 저장한다.
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m).fill(0));

  let max = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i - 1][j] === '0') dp[i][j] = 0;
      else {
        dp[i][j] = dp[i - 1][j] + 1;
        max = Math.max(max, getWidth(i, j));
      }
    }
  }

  function largestRectangleArea(heights: number[] = [3, 1, 3, 2, 2]): number {
    const stack: number[] = [];
    let maxArea = 0;
    heights.push(0); // Sentinel to ensure all heights are processed

    for (let i = 0; i < heights.length; i++) {
      while (
        0 < stack.length &&
        heights[i] < heights[stack[stack.length - 1]]
      ) {
        const height = heights[stack.pop()!];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
        console.log(maxArea);
      }
      stack.push(i);
    }

    return maxArea;
  }

  console.log(dp);
  largestRectangleArea();

  return max;
}

//
console.log(
  maximalRectangle([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
  ]),
);

// console.log(
//   maximalRectangle([
//     ['0', '0', '1'],
//     ['1', '1', '1'],
//   ]),
// );

//lca
//https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/?envType=daily-question&envId=2026-01-10
function minimumDeleteSum(s1: string, s2: string): number {
  const n = s1.length;
  const m = s2.length;
  // const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const dp = Array.from({ length: n + 1 }, () =>
    new Uint32Array(m + 1).fill(0),
  );

  for (let i = 1; i <= n; i++) {
    const char = s1[i - 1];
    for (let j = 1; j <= m; j++) {
      const char2 = s2[j - 1];
      // 확장한다.
      if (char === char2) {
        dp[i][j] = dp[i - 1][j - 1] + char.charCodeAt(0);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const totalSum = Array.from(s1 + s2).reduce(
    (acc, c) => acc + c.charCodeAt(0),
    0,
  );

  return totalSum - dp[n][m] * 2;
}

// console.log(minimumDeleteSum('sea', 'eat'));
// console.log(minimumDeleteSum('dabc', 'dcba'));

function maxDotProduct(nums1: number[], nums2: number[]): number {
  const n = nums1.length;
  const m = nums2.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(Number.MIN_SAFE_INTEGER),
  );

  for (let i = 1; i <= n; i++) {
    const n1 = nums1[i - 1];
    for (let j = 1; j <= m; j++) {
      const n2 = nums2[j - 1];
      // 확장가능한가?
      const current = n1 * n2;

      dp[i][j] = Math.max(
        current,
        dp[i - 1][j - 1] + current,
        dp[i - 1][j],
        dp[i][j - 1],
      );
    }
  }

  return dp[n][m];
}

// console.log(maxDotProduct([2, 1, -2, 5], [3, 0, -6]));
// console.log(maxDotProduct([-1, -1], [1, 1]));

//https://leetcode.com/problems/maximize-win-from-two-segments/
function maximizeWin(prizePositions: number[], k: number): number {
  // 선택할 수 있는 구간은 2개
  // DP로 이전 최대 구간 + 현재 구간의 값을 구해서 값을 더해서 최대값을 만들수 있지않을까?
  const n = prizePositions.length;
  const dp = Array(n).fill(0);

  let result = 0;
  let left = 0;
  for (let right = 0; right < n; right++) {
    while (k < prizePositions[right] - prizePositions[left]) {
      left++;
    }

    const size = right - left + 1;
    // 현재 구간의 최대값과 이전 구간의 최대값을 비교
    dp[right] = Math.max(dp[right - 1] ?? 0, size);
    // 이전 구간의 최대값 + 현재 구간의 값
    result = Math.max(result, (dp[left - 1] ?? 0) + size);
  }

  return result;
}

// console.log(maximizeWin([1, 1, 2, 2, 3, 3, 5], 2));
// console.log(maximizeWin([1, 2, 3, 4], 0));
// console.log(maximizeWin([1, 1, 2, 2, 3, 3, 9, 10, 100, 100, 100], 2));
// console.log(maximizeWin([1, 1, 1, 1, 4, 4, 5, 5, 5, 10, 10, 11], 2));

// https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/?envType=daily-question&envId=2026-01-03
function numOfWays(n: number): number {
  // [2가지 색상,3가지 색상]
  // 2가지 조합 -> [3,2]
  // 3가지 조합 -> [2,2]
  let comb2 = 6;
  let comb3 = 6;
  const mod = Math.pow(10, 9) + 7;
  for (let i = 2; i <= n; i++) {
    const nextComb2 = (comb2 * 3 + comb3 * 2) % mod;
    const nextComb3 = (comb2 * 2 + comb3 * 2) % mod;
    comb2 = nextComb2;
    comb3 = nextComb3;
  }
  return (comb2 + comb3) % mod;
}

//https://leetcode.com/problems/soup-servings/?envType=daily-question&envId=2026-01-02
function soupServings(n: number): number {
  const actions = [
    [-4, 0],
    [-3, -1],
    [-2, -2],
    [-1, -3],
  ];

  // const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  // +
  let result = 0;
  const dfs = (count: number, current: [number, number]) => {
    const [a, b] = current;
    // 두 스프가 모두 떨어졌으면 그반만큼 더한다.
    if (a <= 0 && b <= 0) {
      return 0.5;
    }

    if (a <= 0) {
      return 1;
    }

    if (b <= 0) {
      return 0;
    }

    const result = 0.25 * (1 + 2);

    // for (const [deltaA, deltaB] of actions) {
    //   dfs(count + 1, [a + deltaA, b + deltaB]);
    // }
  };

  const m = Math.ceil(n / 25);
  dfs(0, [m, m]);
  return result * 0.25;
}

// console.log(soupServings(100));

//https://leetcode.com/problems/two-best-non-overlapping-events/?envType=daily-question&envId=2025-12-23
function maxTwoEvents(events: number[][]): number {
  const search = (index: number) => {
    const startTime = events[index][0];
    let start = 0;
    let end = index - 1;
    let target = -1;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const midEndTime = events[mid][1];
      if (midEndTime < startTime) {
        target = mid;
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

    return target;
  };

  const n = events.length;
  // dp[i]: i번째 이벤트까지 고려했을 때의 최대 가치
  const dp = Array.from({ length: n + 1 }, () => 0);
  let result = 0;

  events.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < n; i++) {
    dp[i + 1] = Math.max(events[i][2], dp[i]);
    const prevIndex = search(i);
    result = Math.max(result, dp[prevIndex + 1] + events[i][2]);
  }

  return result;
}

// console.log(
//   maxTwoEvents([
//     [1, 3, 2],
//     [4, 5, 1],
//     [7, 8, 1],
//     [6, 9, 3],
//   ]),
// );

/**
 * https://leetcode.com/problems/delete-columns-to-make-sorted-iii/?envType=daily-question&envId=2025-12-22
 * 각 컬럼을 마지막으로 특정 컬럼을 선택했을 때의 최대 길이
 * 각 컬럼을 선택할 수 있는지 여부는 이전에 선택한 컬럼에 의존
 * 가능한이유? 각 상태는 이전 상태에 의존하며, 각 단계에서 최적의 선택을 하기 때문에 전체 최적해를 구성할 수 있다.
 * 시간 복잡도 O(n^2 * m) n: 문자열 길이, m: 문자열 개수
 */
function minDeletionSize(strs: string[]): number {
  const canPos = (c1: number, c2: number) => {
    for (const str of strs) {
      if (str[c2] < str[c1]) return false;
    }
    return true;
  };

  const n = strs[0].length;
  const dp = Array.from({ length: n }, (): number => 1);

  let max = 1;
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; 0 <= j; j--) {
      if (dp[j] + 1 <= dp[i]) continue;
      if (canPos(j, i)) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }

  return n - max;
}

// console.log(minDeletionSize(['babca', 'bbazb']));
// console.log(minDeletionSize(['ghi', 'def', 'abc']));

//https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/
/**
 * 상태 전이
 * buy1: 첫 번째 매수 후의 최대 이익
 * sell1: 첫 번째 매도 후의 최대 이익
 * buy2: 두 번째 매수 후의 최대 이익
 * sell2: 두 번째 매도 후의 최대 이익
 * 가능한이유? 각 상태는 이전 상태에 의존하며, 각 단계에서 최적의 선택을 하기 때문에 전체 최적해를 구성할 수 있다.
 */
function maxProfit(prices: number[]): number {
  let [buy1, sell1, buy2, sell2] = [-prices[0], 0, -prices[0], 0];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    buy1 = Math.max(buy1, -price);
    sell1 = Math.max(sell1, price + buy1);
    buy2 = Math.max(buy2, sell1 - price);
    sell2 = Math.max(sell2, buy2 + price);
  }

  return sell2;
}

// console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/minimum-plans-to-reach-target-bandwidth/problem?isFullScreen=true
function findMinimumPlansForBandwidth(
  planSizes: number[],
  targetBandwidth: number,
): number {
  const dp = new Array(targetBandwidth + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i < targetBandwidth + 1; i++) {
    for (const planSize of planSizes) {
      if (0 <= dp[i - planSize]) {
        dp[i] = Math.min(dp[i], dp[i - planSize] + 1);
      }
    }
  }

  return dp[targetBandwidth] === Infinity ? -1 : dp[targetBandwidth];
}

// console.log(findMinimumPlansForBandwidth([5], 5));

// https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/longest-increasing-subsequence-length/problem?isFullScreen=true
function computeLongestIncreasingSubsequenceLength(
  n: number,
  quality: number[],
): number {
  const lis: number[] = [];

  for (const n of quality) {
    let left = 0;
    let right = lis.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (lis[mid] < n) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (left < lis.length) {
      lis[left] = n;
    } else {
      lis.push(n);
    }
  }

  return lis.length;
}

// console.log(computeLongestIncreasingSubsequenceLength(8, [4, 5, 2, 6, 7, 1]));

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

const lengthOfLIS = (arr: number[]) => {
  const lis: number[] = [];

  for (let x of arr) {
    let left = 0;
    let right = lis.length;
    let mid = Math.floor((left + right) / 2);

    // 이분 탐색: x가 들어갈 위치 찾기
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      // x보다 작으면 오른쪽 탐색
      if (lis[mid] < x) left = mid + 1;
      else right = mid - 1;
    }

    // 위치에 삽입 or 교체
    if (mid < lis.length) lis[mid] = x;
    else lis.push(x);
  }
  return lis.length;
};

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

// https://school.programmers.co.kr/learn/courses/30/lessons/258707
const n1카드게임 = (coin: number, cards: number[]) => {
  const checkInitCards = () => {
    for (const initCard of initCardSet) {
      if (initCardSet.has(target - initCard)) {
        initCardSet.delete(initCard);
        initCardSet.delete(target - initCard);
        return true;
      }
    }
    return false;
  };

  const checkInitCardsAndAddCards = () => {
    for (const initCard of initCardSet) {
      if (addCardSet.has(target - initCard)) {
        initCardSet.delete(initCard);
        addCardSet.delete(target - initCard);
        return true;
      }
    }

    return false;
  };

  const checkAddCards = () => {
    for (const addCard of addCardSet) {
      if (addCardSet.has(target - addCard)) {
        addCardSet.delete(addCard);
        addCardSet.delete(target - addCard);
        return true;
      }
    }

    return false;
  };

  const n = cards.length;
  const target = n + 1;
  const initCardSet = new Set(cards.slice(0, n / 3));
  const addCardSet = new Set<number>();

  let round = 1;
  for (let i = n / 3; i < cards.length; i++) {
    // 초기 카드 부터 소비 있으면 통과 하고 삭제,
    // 두번째 배열에 현재뽑을수 있는카드를 모두선택,
    addCardSet.add(cards[i++]);
    i < cards.length && addCardSet.add(cards[i] ?? 0);

    if (initCardSet.size && checkInitCards()) {
      // coin을 소비 하지 않고 통과 가능
      round++;
    } else if (initCardSet.size && 0 < coin && checkInitCardsAndAddCards()) {
      round++;
      coin--;
    } else if (addCardSet.size && 1 < coin && checkAddCards()) {
      round++;
      coin -= 2;
    } else {
      return round;
    }
  }
  return round;
};

// console.log(n1카드게임(3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]));
// console.log(n1카드게임(4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]));
// console.log(
//   n1카드게임(
//     10,
//     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
//   ),
// );

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

  return Math.min(...dp[1]);
};

// console.log(
//   solution2(10, [
//     [4, 1],
//     [5, 1],
//     [5, 6],
//     [7, 6],
//     [1, 2],
//     [1, 3],
//     [6, 8],
//     [2, 9],
//     [9, 10],
//   ]),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/131129
const solution3 = (target: number) => {
  const isSingleOrBull = (n: number) => n === 50 || n <= 20;

  const nums = new Set(
    Array.from({ length: 20 }, (_, i) => [i + 1, (i + 1) * 2, (i + 1) * 3])
      .flat()
      .concat(50)
      .sort((a, b) => a - b),
  );

  const dp = Array.from({ length: target + 1 }, () => [Infinity, 0]);

  for (let i = 1; i <= target; i++) {
    if (nums.has(i)) {
      dp[i] = [1, isSingleOrBull(i) ? 1 : 0];
    } else {
      for (const v of nums) {
        if (i < v) break;
        const [prevCount, prevSingle] = dp[i - v];
        if (prevCount + 1 < dp[i][0]) {
          dp[i] = [prevCount + 1, prevSingle + dp[v][1]];
        } else if (prevCount + 1 === dp[i][0]) {
          dp[i][1] = Math.max(dp[i][1], prevSingle + dp[v][1]);
        }
      }
    }
  }
  return dp[target];
};

// console.log(solution3(121));

const solution4 = (picks: number[], minerals: string[]) => {
  const getCost = (startIdx: number, pick: number) => {
    const start = startIdx * 5;
    return minerals.slice(start, start + 5).reduce((cost, mineral) => {
      const mineralCost = costTable.get(pick)?.get(mineral) ?? 0;
      return cost + mineralCost;
    }, 0);
  };

  const costTable: Map<number, Map<string, number>> = new Map([
    [
      0,
      new Map([
        ['diamond', 1],
        ['iron', 1],
        ['stone', 1],
      ]),
    ],
    [
      1,

      new Map([
        ['diamond', 5],
        ['iron', 1],
        ['stone', 1],
      ]),
    ],
    [
      2,
      new Map([
        ['diamond', 25],
        ['iron', 5],
        ['stone', 1],
      ]),
    ],
  ]);
  const n = Math.ceil(minerals.length / 5);
  const dp: Map<string, number>[] = Array.from(
    { length: n + 1 },
    () => new Map(),
  );
  dp[0].set(picks.join(''), 0);

  for (let i = 0; i < n; i++) {
    for (const [key, cost] of dp[i]) {
      if (key === '000') return Math.min(...dp[i].values());

      const curPicks = key.split('').map(Number);
      curPicks.forEach((count, pick) => {
        if (count === 0) return;
        const newPicks = [...curPicks];
        newPicks[pick]--;
        const newPicksKey = newPicks.join('');
        const newCost = cost + getCost(i, pick);

        if (
          !dp[i + 1].has(newPicksKey) ||
          newCost < dp[i + 1].get(newPicksKey)!
        ) {
          dp[i + 1].set(newPicksKey, newCost);
        }
      });
    }
  }

  return Math.min(...dp[n].values());
};

// console.log(
//   solution4(
//     [0, 1, 1],
//     [
//       'diamond',
//       'diamond',
//       'diamond',
//       'diamond',
//       'diamond',
//       'iron',
//       'iron',
//       'iron',
//       'iron',
//       'iron',
//       'diamond',
//     ],
//   ),
// );

// LCS-string
const longestCommonSubsequence = (text1: string, text2: string) => {
  const dp = Array.from({ length: text1.length + 1 }, (): number[] =>
    Array(text2.length + 1).fill(0),
  );

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
};

// console.log(longestCommonSubsequence('abcde', 'ace'));

// https://www.hackerrank.com/challenges/dynamic-programming-classics-the-longest-common-subsequence/problem?isFullScreen=true
const largestCommonSubsequence = (a: number[], b: number[]) => {};

// console.log(
//   largestCommonSubsequence([2, 3, 4, 1, 2, 3, 4, 5, 6], [5, 6, 7, 8, 1, 2]),
// );

// console.log(largestCommonSubsequence([1, 2, 3, 4, 1], [3, 4, 1, 2, 1, 3]));
// console.log(largestCommonSubsequence([1, 2, 3, 4, 1], [2, 3, 1, 2, 3, 19]));
