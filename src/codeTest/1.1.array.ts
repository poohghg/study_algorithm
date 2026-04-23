export default {};

//https://leetcode.com/problems/sum-of-distances/?envType=daily-question&envId=2026-04-23
function distance(nums: number[]): number[] {
  const numsMap = new Map<number, number[]>();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (!numsMap.has(num)) {
      numsMap.set(num, [0]);
    }
    numsMap.get(num)!.push(numsMap.get(num)!.at(-1)! + i);
  }

  const idxOfNums = new Map<number, number>(
    Array.from(numsMap.keys()).map((num) => [num, 0]),
  );

  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (numsMap.get(num)!.length === 2) {
      result.push(0);
      continue;
    }

    const prefix = numsMap.get(num)!;
    const currentIdx = idxOfNums.get(num)!;

    const left = currentIdx * i - prefix[currentIdx];

    const right =
      prefix.at(-1)! -
      prefix[currentIdx] -
      (prefix.length - 1 - currentIdx) * i;

    result.push(left + right);
    idxOfNums.set(num, currentIdx + 1);
  }

  return result;
}

console.log(distance([1, 3, 1, 1, 2]));

//https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations/?envType=daily-question&envId=2026-04-21
function minimumHammingDistance(
  source: number[],
  target: number[],
  allowedSwaps: number[][],
): number {
  const graph = allowedSwaps.reduce((acc, [node1, node2]) => {
    if (!acc.has(node1)) acc.set(node1, []);
    if (!acc.has(node2)) acc.set(node2, []);
    acc.get(node1)!.push(node2);
    acc.get(node2)!.push(node1);
    return acc;
  }, new Map<number, number[]>());

  const size = source.length;

  const bfs = (s: number, t: number) => {
    const visited = new Set<number>();
    const q = [s];
    visited.add(s);

    while (q.length) {
      const node = q.shift()!;

      for (const nextNode of graph.get(node) ?? []) {
        if (source[nextNode] === t && !fixed.has(nextNode)) return nextNode;
        if (!visited.has(nextNode)) {
          q.push(nextNode);
          visited.add(nextNode);
        }
      }
    }

    return -1;
  };

  // 여기서 유니온 파인드 개념
  // 해당 노드에서 갈 수 있는 노드들을 미리 구한다.
  console.log(graph);

  const fixed = new Set<number>();
  for (let i = 0; i < size; i++) {
    // 확정
    if (source[i] === target[i]) {
      fixed.add(i);
      continue;
    }

    const swapIndex = bfs(i, target[i]);

    if (swapIndex !== -1) {
      fixed.add(i);
      [source[i], source[swapIndex]] = [source[swapIndex], source[i]];
    }
  }

  return size - fixed.size;
}

// console.log(
//   minimumHammingDistance(
//     [5, 1, 2, 4, 3],
//     [1, 5, 4, 2, 3],
//     [
//       [0, 4],
//       [4, 2],
//       [1, 3],
//       [1, 4],
//     ],
//   ),
// );

//https://leetcode.com/problems/two-furthest-houses-with-different-colors/?envType=daily-question&envId=2026-04-20
function maxDistance1(colors: number[]): number {
  const numsMap = new Map<number, [number, number]>();

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    if (!numsMap.has(color)) {
      numsMap.set(color, [i, i]);
      continue;
    }

    numsMap.get(color)![1] = i;
  }

  let max = 0;
  for (const [color, [start, end]] of numsMap) {
    for (let i = colors.length - 1; start < i; i--) {
      if (colors[i] !== color) {
        max = Math.max(max, i - start);
        break;
      }
    }

    for (let i = 0; i < end; i++) {
      if (colors[i] !== color) {
        max = Math.max(max, end - i);
        break;
      }
    }
  }

  return max;
}

// console.log(maxDistance1([1, 8, 3, 8, 3]));

//https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/?envType=daily-question&envId=2026-04-19
function maxDistance(nums1: number[], nums2: number[]): number {
  const size = nums2.length;
  let max = 0;
  let j = 0;

  for (let i = 0; i < nums1.length; i++) {
    const num1 = nums1[i];

    while (j < i && j < size) {
      if (j === size - 1) break;
      j++;
    }

    while (num1 <= nums2[j] && j < size) {
      max = Math.max(max, j - i);
      if (j === size - 1) break;
      j++;
    }
  }

  return max;
}

// console.log(maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25]));

function minMirrorPairDistance(nums: number[]): number {
  const reverse = (num: number) => {
    let result = 0;
    let division = num;

    while (0 < division) {
      const last = division % 10;
      division = Math.floor(division / 10);
      result = result * 10 + last;
    }

    return result;
  };

  const map = new Map<number, number>();
  let result = Infinity;
  for (let i = nums.length - 1; 0 <= i; i--) {
    const reverseNum = reverse(nums[i]);

    if (map.has(reverseNum)) {
      result = Math.min(result, map.get(reverseNum)! - i);
    }

    map.set(nums[i], i);
  }

  return result === Infinity ? -1 : result;
}

// console.log(minMirrorPairDistance([120, 21]));

//https://leetcode.com/problems/closest-equal-element-queries/solutions/7932156/solved-using-binary-search-and-hash-map-46v3v/?envType=daily-question&envId=2026-04-16
function solveQueries(nums: number[], queries: number[]): number[] {
  const bs = (arr: number[], target: number) => {
    let left = 0;
    let right = arr.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (target === arr[mid]) {
        return mid;
      }

      if (target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return 0;
  };

  const size = nums.length;
  const numsMap = queries.reduce((acc, index) => {
    acc.set(nums[index], []);
    return acc;
  }, new Map<number, number[]>());

  for (let i = 0; i < size; i++) {
    const num = nums[i];
    if (numsMap.has(num)) {
      numsMap.get(num)!.push(i);
    }
  }

  let result: number[] = [];

  for (const query of queries) {
    const num = nums[query];
    let pos = numsMap.get(num)!;

    if (pos.length < 2) {
      result.push(-1);
      continue;
    }

    let min = Infinity;
    const index = bs(pos, query);
    const x = pos[index];

    // 좌측이랑 거리
    if (index === 0) {
      min = Math.min(x + size - pos[pos.length - 1]);
    } else {
      min = Math.min(x - pos[index - 1]);
    }

    // 우측이랑 거리
    if (index === pos.length - 1) {
      min = Math.min(min, Math.abs(pos[0] + size - x));
    } else {
      min = Math.min(min, pos[index + 1] - x);
    }

    result.push(min);
  }

  return result;
}

// console.log(solveQueries([1, 3, 1, 4, 1, 3, 2], [0, 3, 5]));

function minNumberOfSeconds(
  mountainHeight: number,
  workerTimes: number[],
): number {
  const maxT: number = Math.max(...workerTimes);
  const n: number = workerTimes.length;
  const v: number = Math.ceil(mountainHeight / n);

  let start: number = 0;
  let end: number = (maxT * v * (v + 1)) / 2;
  let res: number = end;

  while (start <= end) {
    let mid: number = Math.floor(start + (end - start) / 2);
    let totalHeight: number = 0;

    for (const t of workerTimes) {
      const x: number = Math.floor((-1 + Math.sqrt(1 + (8 * mid) / t)) / 2);
      totalHeight += x;
      if (totalHeight >= mountainHeight) break;
    }

    if (totalHeight >= mountainHeight) {
      res = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return res;
}

// console.log(minNumberOfSeconds(10, [3, 2, 2, 4]));

function countPalindromicSubsequence(s: string): number {
  const chars = new Set(s);

  let result = 0;
  for (const c of chars) {
    const left = s.indexOf(c);
    const right = s.lastIndexOf(c);

    if (left !== right) {
      result += new Set(s.slice(left + 1, right)).size;
    }
  }

  return result;
}

// console.log(countPalindromicSubsequence('aabca'));

//https://leetcode.com/problems/minimum-distance-to-the-target-element/?envType=daily-question&envId=2026-04-13
function getMinDistance(nums: number[], target: number, start: number): number {
  let result = Infinity;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (num === target) {
      const dist = Math.abs(i - start);
      result = Math.min(result, dist);
    }
  }

  return result;
}

// console.log(getMinDistance([1, 1, 1, 1, 1], 1, 1));

function minSubarray(nums: number[], p: number): number {
  const total = nums.reduce((a, b) => a + b);

  const mods = Array(p).fill(-1);
  mods[0] = 0;

  let prefix = 0;

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    prefix += n;
    console.log('test', prefix % p);
  }

  return 1;
}

// console.log(minSubarray([6, 4, 5, 1, 5], 5));

/**
 * https://leetcode.com/problems/subarray-sums-divisible-by-k/
 * 현재까지의 누적 합을 K로 나눈 나머지"가 "과거의 어떤 시점에서의 누적 합을 K로 나눈 나머지"와 같다면,
 * 그 두 지점 사이의 부분 배열의 합은 K로 나누어 떨어진다.
 * 현재 누적 합 % K == 과거 누적 합 % K 를 만족하는 이유는 누적 합이 K로 나누어 떨어지는 경우, 즉 누적 합 % K == 0인 경우를 생각해보면
 * 이 때는 현재 누적 합과 과거 누적 합이 모두 K로 나누어 떨어지는 경우가 된다.
 * 두 누적합의 구간을 구할 때 현재 누적합에서 과거 누적합을 뺀다. 이때 나머지는 서로 상쇄되어 없어지기 때문에 결과적으로 그 구간의 합이 K로 나누어 떨어지는 경우가 된다.
 */

function subarraysDivByK(nums: number[], k: number): number {
  const mods = Array(k).fill(0);
  mods[0] = 1;

  let result = 0;
  let prefix = 0;
  for (const num of nums) {
    prefix += num;
    const mod = ((prefix % k) + k) % k;
    result += mods[mod];
    mods[mod]++;
  }

  return result;
}

// console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5));

/**
 * https://leetcode.com/problems/maximum-subarray-sum-with-length-divisible-by-k/?envType=daily-question&envId=2026-04-10
 * (현재까지 확인한 원소의 개수) % k == (이전에 뺐던 지점의 원소 개수) % k 는 두 지점 사이의 원소 개수가 k의 배수임을 의미한다.
 * 따라서, 현재까지의 누적 합에서 나머지가 같은 이전 누적 합을 빼면, 그 사이의 원소 개수가 k의 배수인 부분 배열의 합을 구할 수 있다.
 * 이때, 나머지가 같은 이전 누적 합들 중 가장 작은 값(최솟값)을 빼야 최대 합을 얻을 수 있다.
 * 이유는, 누적 합에서 더 작은 값을 빼면 더 큰 결과가 나오기 때문이다.
 * 따라서, 나머지가 같은 이전 누적 합들 중 가장 작은 값(최솟값)을 저장하면서 탐색해야 한다.
 */
function maxSubarraySum(nums: number[], k: number): number {
  const mindMods = Array.from({ length: k }, () => Infinity);
  mindMods[0] = 0;
  let result = -Infinity;
  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const mod = (i + 1) % k;

    if (mindMods[mod] !== Infinity) {
      result = Math.max(result, prefixSum - mindMods[mod]);
    }

    mindMods[mod] = Math.min(mindMods[mod], prefixSum);
  }

  return result;
}

// console.log(maxSubarraySum([-5, 1, 2, -3, 4, 1, 2], 3));

//https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i/description/?envType=daily-question&envId=2026-04-10
function minimumDistance(nums: number[]): number {
  const map = new Map<number, number[]>();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];

    if (!map.has(n)) {
      map.set(n, []);
    }

    map.get(n)!.push(i);
  }

  const sumOfNum = (v1: number, v2: number) => {
    return Math.abs(v1 - v2);
  };

  let result = Infinity;
  for (const [k, value] of map) {
    const size = value.length;
    if (size < 3) continue;

    for (let i = 0; i < size - 2; i++) {
      const sum =
        sumOfNum(value[i], value[i + 1]) +
        sumOfNum(value[i], value[i + 2]) +
        sumOfNum(value[i + 1], value[i + 2]);
      result = Math.min(result, sum);
    }
  }

  return result === Infinity ? -1 : result;
}

// console.log(minimumDistance([1, 1, 2, 3, 2, 1, 2]));

//https://leetcode.com/problems/number-of-substrings-with-only-1s/?envType=daily-question&envId=2026-04-09
function numSub(s: string): number {
  const mod = Math.pow(10, 9) + 7;

  const getLenCount = (len: number) => {
    return (len * (len + 1)) / 2;
  };

  let result = 0;
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '0') {
      result += getLenCount(count);
      count = 0;
    } else {
      count++;
    }
  }

  result += getLenCount(count);
  return result % mod;
}

// console.log(numSub('0110111'));

//https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array/
function maxScoreIndices(nums: number[]): number[] {
  let leftZero = 0;
  let rightOne = nums.reduce((acc, v) => acc + v);
  let result: number[] = [0];
  let max = leftZero + rightOne;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === 0) {
      leftZero++;
    } else {
      rightOne--;
    }

    if (max === leftZero + rightOne) {
      result.push(i + 1);
    }

    if (max < leftZero + rightOne) {
      max = leftZero + rightOne;
      result = [i + 1];
    }
  }

  return result;
}

// console.log(maxScoreIndices([0, 0, 0]));

/**
 * https://leetcode.com/problems/minimum-size-subarray-in-infinite-array/
 * 배열은 무한하므로, target 안에는 nums의 총합이 포함될 수 있다.
 * K(반복횟수) = target / totalSum
 * remain(남은 타겟, 실제 구해야하는 값) = target % totalSum
 * 이로써 전체 길이 중 k * n (n은 배열의 길이) 만큼은 이미 확보된 상태가 되며, 우리는 무한 배열 내에서 합이 rem이 되는 가장 짧은 부분 배열의 길이만 찾으면 된다.
 *
 * 2배 길이 배열을 탐색하는 이유?
 * 찾고자 하는 합인 remain은 항상 total_sum보다 작기 때문에, 이 합을 만드는 부분 배열의 길이는 nums의 길이 n을 넘을 수 없다.
 * 하지만 무한 배열의 특성상, 배열의 끝부분부터 다시 처음 부분으로 이어지는 형태(Wrap-around)로 부분 배열이 형성될 수 있다.
 * 이를 포착하기 위해서는 nums의 길이 n을 넘어서는 탐색이 필요하다. 따라서, 2n 길이의 배열을 탐색함으로써, wrap-around 형태의 부분 배열도 고려할 수 있게 된다.
 */

function minSizeSubarray(nums: number[], target: number): number {
  const n = nums.length;
  const totalSum = nums.reduce((a, b) => a + b);
  const k = Math.floor(target / totalSum);
  const remain = target % totalSum;

  let left = 0;
  let sum = 0;
  let size = Infinity;
  for (let right = 0; right < n * 2; right++) {
    sum += nums[right % n];

    while (remain < sum && left <= right) {
      sum -= nums[left % n];
      left++;
    }

    if (remain === sum) {
      size = Math.min(size, right - left + 1);
    }
  }

  return size === Infinity ? -1 : size + k * n;
}

// console.log(minSizeSubarray([1, 1, 1, 2, 3], 4));

//https://leetcode.com/problems/alternating-groups-i/
function numberOfAlternatingGroups(colors: number[]): number {
  const first = colors[0];
  const last = colors[colors.length - 1];
  const arr = [last, ...colors, first];

  let count = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    const myColor = arr[i];
    if (myColor !== arr[i - 1] && myColor !== arr[i + 1]) count++;
  }

  return count;
}

// console.log(numberOfAlternatingGroups([0, 1, 0, 0, 1]));

//https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn/?envType=daily-question&envId=2026-04-02
function maximumAmount(coins: number[][]): number {
  const n = coins.length;
  const m = coins[0].length;
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, (): number[] => [
      -Infinity,
      -Infinity,
      -Infinity,
    ]),
  );

  const start = coins[0][0];
  dp[0][0][0] = start;

  if (start < 0) {
    dp[0][0][1] = 0;
  }

  for (let i = 1; i < n; i++) {
    const num = coins[i][0];
    const prev = dp[i - 1][0].slice();

    for (let k = 0; k <= 2; k++) {
      dp[i][0][k] = Math.max(dp[i][0][k], prev[k] + num);

      if (num < 0 && 0 < k) {
        dp[i][0][k] = Math.max(dp[i][0][k], prev[k - 1]);
      }
    }
  }

  for (let i = 1; i < m; i++) {
    const num = coins[0][i];
    const prev = dp[0][i - 1].slice();

    for (let k = 0; k <= 2; k++) {
      dp[0][i][k] = Math.max(dp[0][i][k], prev[k] + num);

      if (num < 0 && 0 < k) {
        dp[0][i][k] = Math.max(dp[0][i][k], prev[k - 1]);
      }
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      const num = coins[i][j];
      const up = dp[i - 1][j].slice();
      const left = dp[i][j - 1].slice();

      for (let k = 0; k <= 2; k++) {
        dp[i][j][k] = Math.max(dp[i][j][k], up[k] + num, left[k] + num);

        if (num < 0 && 0 < k) {
          dp[i][j][k] = Math.max(dp[i][j][k], up[k - 1], left[k - 1]);
        }
      }
    }
  }

  return Math.max(...dp[n - 1][m - 1]);
}

// console.log(
//   maximumAmount([
//     [-16, 4, 1, -1],
//     [11, 9, 3, 3],
//     [-6, 17, -19, 9],
//     [14, -17, -19, -13],
//   ]),
// );

//https://leetcode.com/problems/greatest-sum-divisible-by-three/?envType=daily-question&envId=2026-04-01
function maxSumDivThree(nums: number[]): number {
  const dp: number[] = [0, 0, 0];

  for (const num of nums) {
    const prev = dp.slice();
    for (const v of prev) {
      const sum = num + v;
      dp[sum % 3] = Math.max(dp[sum % 3], sum);
    }
  }

  return dp[0];
}

// console.log(maxSumDivThree([3, 6, 5, 1, 8]));

//https://leetcode.com/problems/construct-product-matrix/?envType=daily-question&envId=2026-03-31
function constructProductMatrix(grid: number[][]): number[][] {
  const n = grid.length;
  const m = grid[0].length;
  const mod = 12345;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  let total = 1;
  for (let i = n - 1; 0 <= i; i--) {
    for (let j = m - 1; 0 <= j; j--) {
      dp[i][j] = total;
      total = (total * grid[i][j]) % mod;
    }
  }

  total = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i][j] = (dp[i][j] * total) % mod;
      total = (total * grid[i][j]) % mod;
    }
  }

  return dp;
}

//https://leetcode.com/problems/equal-sum-grid-partition-i/?envType=daily-question&envId=2026-03-25
function canPartitionGrid(grid: number[][]): boolean {
  const n = grid.length;
  const m = grid[0].length;
  const total = grid.reduce((acc, row) => {
    return acc + row.reduce((a, b) => a + b);
  }, 0);

  const makeTotalNums = () => {
    return grid.reduce((acc, row) => {
      row.forEach((n) => {
        acc.set(n, 1 + (acc.get(n) ?? 0));
      });
      return acc;
    }, new Map<number, number>());
  };

  const canRowPartition = () => {
    const leftNums = new Map<number, number>();
    const rightNums = makeTotalNums();

    let rightSum = total;
    let sum = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m; j++) {
        const n = grid[i][j];
        sum += n;
        rightSum -= n;
        leftNums.set(n, (leftNums.get(n) ?? 0) + 1);
        rightNums.set(n, rightNums.get(n)! - 1);
        if (rightNums.get(n) === 0) rightNums.delete(n);
      }

      if (sum === rightSum) return true;

      if (sum < rightSum) {
        const splitNum = rightSum - sum;
        if (rightNums.has(splitNum)) {
          return true;
        }
      }

      if (rightSum < sum) {
        const splitNum = sum - rightSum;
        if (leftNums.has(splitNum)) {
          return true;
        }
      }
    }
    return false;
  };

  const canColPartition = () => {
    const leftNums = new Map<number, number>();
    const rightNums = makeTotalNums();

    let rightSum = total;
    let sum = 0;

    for (let j = 0; j < m - 1; j++) {
      for (let i = 0; i < n; i++) {
        const n = grid[i][j];

        sum += n;
        rightSum -= n;
        leftNums.set(n, (leftNums.get(n) ?? 0) + 1);
        rightNums.set(n, rightNums.get(n)! - 1);
        if (rightNums.get(n) === 0) rightNums.delete(n);
      }

      if (sum === rightSum) return true;

      if (sum < rightSum) {
        const splitNum = rightSum - sum;
        if (rightNums.has(splitNum)) {
          return true;
        }
      }

      if (rightSum < sum) {
        const splitNum = sum - rightSum;
        if (leftNums.has(splitNum)) {
          return true;
        }
      }
    }

    return false;
  };

  return canRowPartition() || canColPartition();
}

// console.log(
//   canPartitionGrid([
//     [1, 2, 4], // 7
//     [2, 3, 5], // 10
//   ]),
// );

//https://leetcode.com/problems/successful-pairs-of-spells-and-potions/?envType=daily-question&envId=2026-02-25
function successfulPairs(spells: number[], potions: number[], success: number) {
  const bs = (spell: number) => {
    const target = Math.ceil(success / spell);

    if (potions[potions.length - 1] < target) {
      return 0;
    }

    if (target <= potions[0]) {
      return potions.length;
    }

    let left = 1;
    let right = potions.length - 2;
    let result = potions.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (target <= potions[mid]) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return potions.length - result;
  };

  potions.sort((a, b) => a - b);
  const result = new Uint32Array(spells.length);

  for (let i = 0; i < spells.length; i++) {
    result[i] = bs(spells[i]);
  }

  return result;
}

// console.log(successfulPairs([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], 25));

//https://leetcode.com/problems/maximum-total-damage-with-spell-casting/?envType=daily-question&envId=2026-02-21
function maximumTotalDamage(power: number[]): number {
  const n = power.length;
  power.sort((a, b) => a - b);
  return 1;
}

// console.log(maximumTotalDamage([7, 1, 6, 6]));

//https://leetcode.com/problems/water-bottles-ii/?envType=daily-question&envId=2026-02-20
function maxBottlesDrunk(numBottles: number, numExchange: number): number {
  let result = 0;
  let empty = 0;
  while (0 < numBottles) {
    result += numBottles;
    empty += numBottles;
    numBottles = 0;

    if (numExchange <= empty) {
      empty -= numExchange;
      numBottles++;
      numExchange++;
    }
  }

  return result;
}

// console.log(maxBottlesDrunk(13, 6));

//https://leetcode.com/problems/find-triangular-sum-of-an-array/?envType=daily-question&envId=2026-02-20
function triangularSum(nums: number[]): number {
  let size = nums.length;
  while (1 < size) {
    for (let i = 0; i < size - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    size--;
  }
  return nums[0];
}

// console.log(triangularSum([1, 2, 3, 4, 5]));

//https://leetcode.com/problems/triangle/submissions/1924198333/?envType=daily-question&envId=2026-02-19
function minimumTotal(triangle: number[][]): number {
  const n = triangle.length;
  const dp = Array.from({ length: n }, (_, i): number[] => triangle[i].slice());

  for (let i = n - 2; 0 <= i; i--) {
    for (let j = 0; j <= i; j++) {
      const left = dp[i + 1][j];
      const right = dp[i + 1][j + 1];
      dp[i][j] += Math.min(left, right);
    }
  }

  return dp[0][0];
}

// console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
/**
 * 두 변 중 짧은 합이 가장 긴 변보다 커야한다. a + b > c
 * 정렬된 배열에서 가장 긴 변이 가장 뒤에 오도록 정렬한 후, 가장 긴 변을 고정하고 나머지 두 변을 투 포인터로 탐색하는 방식으로 구현할 수 있다.
 */
//https://leetcode.com/problems/valid-triangle-number/description/?envType=daily-question&envId=2026-02-19
function triangleNumber(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let result = 0;

  for (let k = nums.length - 1; 2 <= k; k--) {
    const max = nums[k];
    let l = 0;
    let r = k - 1;
    while (l < r) {
      if (max < nums[l] + nums[r]) {
        result += r - l;
        r--;
      } else {
        l++;
      }
    }
  }
  return result;
}

// console.log(triangleNumber([1, 2, 3, 4, 2]));
