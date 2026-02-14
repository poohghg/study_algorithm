import PriorityQueue from '../dataStructure/PriorityQueue';

export default {};

function longestBalancedNum(nums: number[]): number {
  const n = nums.length;

  let result = 0;
  for (let i = 0; i < n; i++) {
    const visited = new Set<number>();
    let balance = 0;
    for (let j = i; j < n; j++) {
      const num = nums[j];
      if (!visited.has(num)) {
        balance += num % 2 === 0 ? 1 : -1;
        visited.add(num);
      }

      if (balance === 0) {
        result = Math.max(result, j - i + 1);
      }
    }
  }
  return result;
}

console.log(longestBalancedNum([1, 2, 3, 2]));

//https://leetcode.com/problems/longest-balanced-substring-i/?envType=daily-question&envId=2026-02-12
function longestBalanced(s: string): number {
  const n = s.length;
  const delta = 97;

  let result = 1;
  for (let i = 0; i < n; i++) {
    const count = new Array(26).fill(0);
    let distinct = 0;
    let maxFreq = 0;

    for (let j = i; j < n; j++) {
      const index = s[j].charCodeAt(0) - delta;

      if (count[index] === 0) {
        distinct++;
      }

      count[index]++;
      maxFreq = Math.max(maxFreq, count[index]);
      const size = j - i + 1;

      if (size === maxFreq * distinct) {
        result = Math.max(result, size);
      }
    }
  }

  return result;
}

// console.log(longestBalanced('zzabc'));

//https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/?envType=daily-question&envId=2026-02-11
function minimumDeletions(s: string): number {
  let res = 0;
  let bCount = 0;
  for (const c of s) {
    if (c === 'b') {
      bCount++;
    } else if (bCount < 1) {
      bCount--;
      res++;
    }
  }

  return res;
}

// console.log(minimumDeletions('aababbab'));
// console.log(minimumDeletions('aaaaaaaaaaaaaa'));

//https://leetcode.com/problems/minimum-removals-to-balance-array/?envType=daily-question&envId=2026-02-11
function minRemoval(nums: number[], k: number): number {
  const n = nums.length;
  if (n === 1) return 0;

  nums.sort((a, b) => a - b);
  // 배열의 최대값이 최소값 x k 이하여야함.
  let count = nums.length;
  let l = 0;
  for (let r = 1; r < n; r++) {
    while (nums[l] * k < nums[r] && l <= r) {
      l++;
    }
    count = Math.min(count, n - (r - l + 1));
  }

  return count;
}

//https://leetcode.com/problems/transformed-array/?envType=daily-question&envId=2026-02-05
function constructTransformedArray(nums: number[]) {
  const n = nums.length;
  const result = new Int8Array(nums.length);

  for (let i = 0; i < n; i++) {
    const v = nums[i];
    let targetIndex = (v + i) % n;

    if (targetIndex < 0) {
      targetIndex = n + targetIndex;
    }

    result[i] = nums[targetIndex];
  }

  return result;
}

// console.log(constructTransformedArray([-10, -10]));

//https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i/?envType=daily-question&envId=2026-02-02
function minimumCost(nums: number[]): number {
  const merge = (arr1: number[], arr2: number[]) => {
    let arr1Idx = 0;
    let arr2Idx = 0;
    const arr: number[] = [];

    while (arr1Idx < arr1.length && arr2Idx < arr2.length && arr.length < 2) {
      if (arr1[arr1Idx] <= arr2[arr2Idx]) {
        arr.push(arr1[arr1Idx++]);
      } else {
        arr.push(arr2[arr2Idx++]);
      }
    }

    while (arr1Idx < arr1.length && arr.length < 2) arr.push(arr1[arr1Idx++]);
    while (arr2Idx < arr2.length && arr.length < 2) arr.push(arr2[arr2Idx++]);

    return arr;
  };

  const bfs = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = bfs(arr.slice(0, mid));
    const right = bfs(arr.slice(mid));

    return merge(left, right);
  };

  return [nums[0], ...bfs(nums.slice(1))].reduce((a, b) => a + b);
}

// console.log(minimumCost([1, 2, 3, 12, 5, 6, 1]));

function nextGreatestLetter(letters: string[], target: string): string {
  const set = new Set(letters.map((v) => v.charCodeAt(0)));

  let result = letters[0];
  let start = target.charCodeAt(0) + 1;

  while (start <= 'z'.charCodeAt(0)) {
    if (set.has(start)) {
      return String.fromCharCode(start);
    }
    start++;
  }

  return result;
}

// console.log(nextGreatestLetter(['c', 'f', 'j'], 'a'));

function minimumAbsDifference(arr: number[]): number[][] {
  const n = arr.length;
  let lefts: number[] = [];
  let min = Number.MAX_SAFE_INTEGER;

  arr.sort((a, b) => a - b);
  for (let i = 0; i < n - 1; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1]);

    if (diff === min) {
      lefts.push(i);
    } else if (diff < min) {
      min = diff;
      lefts = [i];
    }
  }

  return lefts.map((i) => [arr[i], arr[i + 1]]);
}

// console.log(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27]));

//https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/?envType=daily-question&envId=2026-01-25
function minimumDifference(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);

  if (nums.length === k) {
    return nums[0] - nums[k - 1];
  }

  let result = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i <= nums.length - k; i++) {
    result = Math.min(result, nums[i] - nums[i + k - 1]);
  }

  return result;
}

// console.log(
//   minimumDifference(
//     [
//       11181, 23291, 24520, 92567, 19530, 12631, 11048, 37325, 36730, 45935,
//       43785, 85701, 60558, 4847, 88701, 27809, 76264, 73637, 50367, 48998,
//       31556, 28617, 60992, 76542, 71383, 22035, 95023, 89149, 54342, 12712,
//       93885, 1243, 5682, 75211, 60667, 68766, 94505, 67043, 98893, 80977, 6367,
//       13446, 64482, 13383, 71717, 22432, 49079, 52101, 61754, 98448, 42679,
//       35519, 523, 93809, 91584, 12763, 49377, 42131, 9990, 23324, 22887, 91557,
//       21905, 49635, 14267,
//     ],
//     39,
//   ),
// );

//https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/?envType=daily-question&envId=2026-01-25
function minPairSum(nums: number[]): number {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  let result = 0;

  for (let i = 0; i < n / 2; i++) {
    result = Math.max(result, nums[i] + nums[n - i - 1]);
  }

  return result;
}

// console.log(minPairSum([3, 5, 4, 2, 4, 6]));

function maxAverageRatio(classes: number[][], extraStudents: number): number {
  // 통과/학생수
  // 전체 학생수가 적을수록 증가률이 높아짐
  const maxHeap = new PriorityQueue<[number, number, number]>((a, b) => {
    return a[2] > b[2];
  });

  let oneCount = 0;
  for (const [p, t] of classes) {
    if (p / t === 1) {
      oneCount++;
    } else {
      const increase = (p + 1) / (t + 1) - p / t;
      maxHeap.push([p, t, increase]);
    }
  }

  while (extraStudents && maxHeap.size) {
    const [p, t] = maxHeap.pop()!;
    const [np, nt] = [p + 1, t + 1];
    const increase = (np + 1) / (nt + 1) - np / nt;
    maxHeap.push([np, nt, increase]);
    extraStudents--;
  }

  const calcedData = maxHeap.data.reduce((acc, [pass, total]) => {
    return acc + pass / total;
  }, 0);

  return (calcedData + oneCount) / classes.length;
}

// console.log(
//   maxAverageRatio(
//     [
//       [2, 4],
//       [3, 9],
//       [4, 5],
//       [2, 10],
//     ],
//     4,
//   ),
// );

//https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i/?envType=daily-question&envId=2026-01-22
function minimumPairRemoval(nums: number[]): number {
  const isSorted = (nums: number[]) => {
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i + 1] < nums[i]) return false;
    }
    return true;
  };

  let removeCount = 0;
  while (nums.length) {
    if (isSorted(nums)) {
      return removeCount;
    }

    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] + nums[i + 1] < min) {
        min = nums[i] + nums[i + 1];
        minIndex = i;
      }
    }

    nums.splice(minIndex, 1, min);
    nums.splice(minIndex + 1, 1);
    removeCount++;
  }

  return 0;
}

// console.log(minimumPairRemoval([5, 2, 1, 3]));

//https://leetcode.com/problems/max-consecutive-ones-iii/
function longestOnes(nums: number[], k: number): number {
  let max = 0;
  let zeros = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;

    while (k < zeros) {
      if (nums[left] === 0) zeros--;
      left++;
    }

    max = Math.max(max, right - left + 1);
  }

  return max;
}

// console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2));

//https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/?envType=daily-question&envId=2026-01-20
function longestSubarray(nums: number[]): number {
  let max = 0;
  let prevCount = 0;
  let count = 0;

  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] === 1) {
      count++;
    } else {
      max = Math.max(count + prevCount, max);
      prevCount = count;
      count = 0;
    }
  }

  return Math.min(max, nums.length - 1);
}

// console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]));
// console.log(longestSubarray([1, 1, 1]));

/**
 * https://leetcode.com/problems/maximum-matrix-sum/?envType=daily-question&envId=2026-01-05
 * 매트릭스 기준 음수는 단 하나가 될 수 있다.
 * row 기준으로 보면 음수가 짝수개면 모두 양수로 바꿀 수 있다.
 * 음수가 홀수개면 가장 절대값이 작은 수를 음수로 남겨둬야 한다.
 * 이때 작은수를 row[0]에 둔다고 생각하보면 된다.
 * 나머지는 모두 양수로 바꿔서 더해주면 된다.
 */
function maxMatrixSum(matrix: number[][]): number {
  let min = Number.MAX_SAFE_INTEGER;
  let negativeCount = 0;
  let sum = 0;

  for (const row of matrix) {
    for (const n of row) {
      if (n < 0) negativeCount++;
      const absN = Math.abs(n);
      min = Math.min(min, absN);
      sum += absN;
    }
  }

  return negativeCount % 2 === 0 ? sum : sum - min * 2;
}

// console.log(
//   maxMatrixSum([
//     [-1, 0, -1],
//     [-2, 1, 3],
//     [3, 2, 2],
//   ]),
// );

//https://leetcode.com/problems/fruit-into-baskets/description/?envType=daily-question&envId=2025-12-30
function totalFruit(fruits: number[]): number {
  const n = fruits.length;
  // 내가 가진 과일 종류
  const indexes = [];
  let set = new Set<number>();
  let result = 0;

  for (let i = 0; i < n; i++) {
    const fruit = fruits[i];

    if (!set.has(fruit)) {
      set.add(fruit);
      indexes.push(i);
    }

    if (2 < set.size) {
      // 장바구니에 3개의 과일 있다면
      // 첫번째 인덱스가 아니라 앞에 있는 인덱스가 어디까지 연결되어 있는지 확인해야한다.
      const firstIndex = indexes.shift()!;
      const frontFruit: number = fruits[i - 1];

      for (let j = i - 2; firstIndex <= j; j--) {
        if (frontFruit !== fruits[j]) {
          indexes[0] = j + 1;
          break;
        }
      }

      result = Math.max(result, i - firstIndex);
      set = new Set<number>([frontFruit, fruits[i]]);
    }
  }

  return Math.max(n - indexes[0], result);
}

// console.log(totalFruit([1, 1]));
// console.log(totalFruit([0, 1, 2, 2]));
// console.log(totalFruit([1, 0, 1, 4, 1, 4, 1, 2, 3]));
// console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]));

//https://leetcode.com/problems/meeting-rooms-iii/description/
function mostBooked(n: number, meetings: number[][]): number {
  const counts: number[] = Array(n).fill(0);
  const freeRooms = new PriorityQueue<number>((a, b) => a < b);
  // [room,endTime]
  const busyRooms = new PriorityQueue<[number, number]>((a, b) => {
    if (a[1] === b[1]) {
      return a[0] < b[0];
    }
    return a[1] < b[1];
  });

  for (let i = 0; i < n; i++) {
    freeRooms.push(i);
  }

  meetings.sort((a, b) => a[0] - b[0]);

  for (const [start, end] of meetings) {
    const duration = end - start;

    while (busyRooms.size && busyRooms.peak![1] <= start) {
      const [index, _] = busyRooms.pop()!;
      freeRooms.push(index);
    }

    let room: number;
    let endTime: number;

    if (freeRooms.size) {
      room = freeRooms.pop()!;
      endTime = end;
    } else {
      const [prevRoom, prevEndTime] = busyRooms.pop()!;
      room = prevRoom;
      endTime = prevEndTime + duration;
    }

    counts[room]++;
    busyRooms.push([room, endTime]);
  }

  let result = 0;
  let max = counts[0];
  for (let i = 1; i < n; i++) {
    if (max < counts[i]) {
      result = i;
      max = counts[i];
    }
  }

  return result;
}

// console.log(
//   mostBooked(2, [
//     [0, 10],
//     [1, 2],
//     [12, 14],
//     [13, 15],
//   ]),
// );

// console.log(
//   mostBooked(2, [
//     [0, 10],
//     [1, 5],
//     [2, 7],
//     [3, 4],
//   ]),
// );

// console.log(
//   mostBooked(4, [
//     [19, 20],
//     [14, 15],
//     [13, 14],
//     [11, 20],
//   ]),
// );

//https://leetcode.com/problems/rearranging-fruits/?envType=daily-question&envId=2025-12-26
function minCost(basket1: number[], basket2: number[]): number {
  const n = basket1.length;
  const totalNumbers: Record<number, [number, number]> = {};

  for (let i = 0; i < n; i++) {
    const v1 = basket1[i];
    const v2 = basket2[i];

    if (!totalNumbers[v1]) {
      totalNumbers[v1] = [0, 0];
    }

    if (!totalNumbers[v2]) {
      totalNumbers[v2] = [0, 0];
    }

    totalNumbers[v1][0] = totalNumbers[v1][0] + 1;
    totalNumbers[v2][1] = totalNumbers[v2][1] + 1;
  }

  const moves: number[] = [];
  let globalMin = Number.MAX_SAFE_INTEGER;
  for (const [key, [b1Count, b2Count]] of Object.entries(totalNumbers)) {
    const totalCount = b1Count + b2Count;
    if (totalCount % 2 === 1) return -1;

    globalMin = Math.min(globalMin, Number(key));

    const half = totalCount / 2;

    if (b1Count > half) {
      moves.push(...Array(b1Count - half).fill(Number(key)));
    }

    if (b2Count > half) {
      moves.push(...Array(b2Count - half).fill(Number(key)));
    }
  }

  moves.sort((a, b) => a - b);
  let result = 0;
  for (let i = 0; i < moves.length / 2; i++) {
    result += Math.min(moves[i], globalMin * 2);
  }

  return result;
}

// console.log(minCost([4, 4, 4, 4, 5], [5, 5, 5, 3, 3]));
// 21 21
// console.log(
//   minCost(
//     [84, 80, 43, 8, 80, 88, 43, 14, 100, 88],
//     [32, 32, 42, 68, 68, 100, 42, 84, 14, 8],
//   ),
// );
// console.log(minCost([4, 4, 4, 4], [5, 5, 2, 2]));
// console.log(minCost([4, 2, 2, 2, 4, 4, 4, 4], [1, 4, 1, 2, 1, 1, 5, 5]));

//https://leetcode.com/problems/maximum-candies-allocated-to-k-children/
function maximumCandies(candies: number[], k: number): number {
  const sum = candies.reduce((a, b) => a + b);
  if (sum < k) return 0;

  // candies.sort((a, b) => b - a);
  // const rightIndex = candies.length < k ? candies.length : k;
  // const arr = candies.slice(0, rightIndex);

  const canAccept = (n: number) => {
    let count = 0;
    for (const candy of candies) {
      count += Math.floor(candy / n);
      if (k <= count) return true;
    }
    return k <= count;
  };

  let min = 0;
  let max = Math.max(...candies);
  let result = 0;
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    if (canAccept(mid)) {
      result = mid;
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return result;
}

// console.log(maximumCandies([99, 1, 1, 1], 3));
// console.log(maximumCandies([4, 7, 5], 4));

//https://leetcode.com/problems/maximize-happiness-of-selected-children/?envType=daily-question&envId=2025-12-25
function maximumHappinessSum(happiness: number[], k: number): number {
  happiness.sort((a, b) => b - a);

  let result = 0;
  for (let i = 0; i < k; i++) {
    result += Math.max(happiness[i] - i, 0);
  }

  return result;
}

// console.log(maximumHappinessSum([1, 2, 3], 2));

// https://leetcode.com/problems/delete-columns-to-make-sorted/?envType=daily-question&envId=2025-12-24
function minDeletionSize(strs: string[]): number {
  const n = strs[0].length;

  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] < strs[j - 1][i]) {
        result++;
        break;
      }
    }
  }

  return result;
}

// console.log(minDeletionSize(['cba', 'daf', 'ghi']));

//https://leetcode.com/problems/apple-redistribution-into-boxes/?envType=daily-question&envId=2025-12-24
function minimumBoxes(apple: number[], capacity: number[]): number {
  capacity.sort((a, b) => b - a);

  let appleSum = apple.reduce((a, b) => a + b);
  let result = 0;

  for (const n of capacity) {
    if (appleSum <= 0) break;
    appleSum -= n;
    result++;
  }

  return result;
}

// console.log(minimumBoxes([1, 3, 2], [4, 3, 1, 5, 2]));

//https://leetcode.com/problems/find-all-people-with-secret/?envType=daily-question&envId=2025-12-19
function findAllPeople(
  n: number,
  meetings: number[][],
  firstPerson: number,
): number[] {
  const timeTable: Record<number, number[][]> = {};
  const times: number[] = [];
  for (const [p1, p2, time] of meetings) {
    if (!timeTable[time]) {
      times.push(time);
      timeTable[time] = [];
    }
    timeTable[time].push([p1, p2]);
  }
  times.sort((a, b) => a - b);

  const hasSecretive = new Set<number>();
  hasSecretive.add(0);
  hasSecretive.add(firstPerson);

  for (const time of times) {
    // make graph
    const stack: number[] = [];
    const graph: Record<number, number[]> = {};
    for (const [t1, t2] of timeTable[time]) {
      if (!graph[t1]) graph[t1] = [];
      if (!graph[t2]) graph[t2] = [];
      graph[t1].push(t2);
      graph[t2].push(t1);
      if (hasSecretive.has(t1)) stack.push(t1);
      if (hasSecretive.has(t2)) stack.push(t2);
    }

    const visited = new Set<number>();
    while (stack.length) {
      const currentNode = stack.pop()!;
      if (visited.has(currentNode)) continue;

      visited.add(currentNode);
      hasSecretive.add(currentNode);

      for (const next of graph[currentNode]) {
        stack.push(next);
      }
    }
  }

  return Array.from(hasSecretive);
}

// console.log(
//   findAllPeople(
//     4,
//     [
//       [3, 1, 3],
//       [1, 2, 2],
//       [0, 3, 3],
//     ],
//     3,
//   ),
// );

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-using-strategy/?envType=daily-question&envId=2025-12-18
function maxProfit3(prices: number[], strategy: number[], k: number): number {
  const n = prices.length;
  const prefixSums = prices.reduce((acc, price, index) => {
    acc.push(price * strategy[index] + (acc[index - 1] ?? 0));
    return acc;
  }, [] as number[]);
  const totalSum = prefixSums[n - 1];

  let maxSum = totalSum;
  for (let i = 0; i <= n - k; i++) {
    // 해당 구간의 누적합을 뺀다
    // 누적합은 i+k - i-1
    let currentSum =
      totalSum - prefixSums[i - 1 + k] + (prefixSums[i - 1] ?? 0);

    for (let j = i + k / 2; j < i + k; j++) {
      currentSum += prices[j];
    }

    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// console.log(maxProfit3([5, 4, 3], [1, 1, 0], 2));

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
function maxProfit2(prices: number[]): number {
  let result = 0;
  let prevMin = Number.MAX_SAFE_INTEGER;

  // 현재 뽑히는 가격(=== 매도 가격) 이때 앞에 가장 작은 매수가격이랑 해서 판다
  for (const price of prices) {
    if (prevMin < price) {
      result += price - prevMin;
      prevMin = price;
    } else {
      prevMin = Math.min(prevMin, price);
    }
  }

  return result;
}

// console.log(maxProfit2([7, 6, 1, 5, 3, 6, 4]));

//https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices: number[]): number {
  let result = 0;
  let min = prices[0];

  for (let i = 1; i < prices.length; i++) {
    result = Math.max(result, prices[i] - min);
    min = Math.min(min, prices[i]);
  }

  return result;
}

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));

//https://leetcode.com/problems/next-permutation/description/
function nextPermutation(nums: number[]): void {
  // 왼쪽이 끝자리 수보다 작은면 스왑한다.
  // let isSwap = false;
  for (let i = nums.length - 1; 1 <= i; i--) {
    const lastNum = nums[i];

    for (let i = nums.length - 2; 0 <= i; i--) {
      const num = nums[i];
      [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
      if (num < lastNum) {
        break;
      }
    }
  }

  console.log(nums);
}

// console.log(nextPermutation([2, 3, 1]));

//https://leetcode.com/problems/subarray-product-less-than-k/
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  let result = 0;
  let left = -1;
  let prefix = 1;

  for (let i = 0; i < nums.length; i++) {
    prefix *= nums[i];
    while (left < i && k <= prefix) {
      prefix = prefix / nums[left];
      left++;
    }
    result += i - left;
  }

  return result;
}

// console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));
// console.log(numSubarrayProductLessThanK([99, 100, 1], 100));

//https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock/?envType=daily-question&envId=2025-12-15
function getDescentPeriods(prices: number[]): number {
  let result = prices.length;
  let continuousStartIndex = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] === prices[i] + 1) {
      result += i - continuousStartIndex;
    } else {
      continuousStartIndex = i;
    }
  }

  return result;
}

// console.log(getDescentPeriods([4, 3, 2, 1]));

/**
 * 각 구간을 2개씩 들어가도록 묶고 그 사이의 P 개수를 곱해준다.
 * P개수를 곱하는 이유? 각 구간 사이에 P가 있으면 그 구간을 나눌 수 있는 방법이 생기기 때문
 */
//https://leetcode.com/problems/number-of-ways-to-divide-a-long-corridor/?envType=daily-question&envId=2025-12-14
function numberOfWays(corridor: string): number {
  const totalSeat = corridor.split('').filter((c) => c === 'S').length;
  if (totalSeat < 2 || totalSeat % 2 !== 0) return 0;
  if (totalSeat === 2) return 1;

  const indexes = corridor.split('').reduce((acc, c, index) => {
    if (c === 'P') return acc;
    acc.push(index);
    return acc;
  }, [] as number[]);

  let result = 1;
  for (let i = 2; i < indexes.length; i += 2) {
    const currentPos = indexes[i];
    const prevPos = indexes[i - 1];
    result = (result * (currentPos - prevPos)) % 1_000_000_007;
  }

  return result;
}

// console.log(numberOfWays('SSPPSPS'));
// console.log(numberOfWays('SSPSS'));

// https://leetcode.com/problems/coupon-code-validator/?envType=daily-question&envId=2025-12-13
type Business = 'electronics' | 'grocery' | 'pharmacy' | 'restaurant';

function validateCoupons(
  code: string[],
  businessLine: string[],
  isActive: boolean[],
): string[] {
  const priority = new Map<string, number>([
    ['electronics', 0],
    ['grocery', 1],
    ['pharmacy', 2],
    ['restaurant', 3],
  ]);

  const isValidBusiness = (business: string): business is Business =>
    priority.has(business);
  const isValidCode = (code: string) => /^[a-zA-Z0-9_]+$/.test(code);

  const n = code.length;
  const result = Array.from({ length: 4 }, (): string[] => []);
  for (let i = 0; i < n; i++) {
    if (
      isActive[i] &&
      isValidCode(code[i]) &&
      isValidBusiness(businessLine[i])
    ) {
      result[priority.get(businessLine[i])!].push(code[i]);
    }
  }

  return result.flatMap((businessLine) => businessLine.sort());
}

// https://leetcode.com/problems/count-mentions-per-user/description/?envType=daily-question&envId=2025-12-12
type UserStatus = 'online' | 'offline';

function countMentions(numberOfUsers: number, events: string[][]): number[] {
  let mentionCount: number[] = Array(numberOfUsers).fill(0);
  // status,will online?
  let userStatues = Array.from(
    { length: numberOfUsers },
    (): [UserStatus, number] => ['online', 0],
  );

  events.sort(
    (a, b) => Number(a[1]) - Number(b[1]) || (a[0] === 'OFFLINE' ? -1 : 1),
  );

  for (const [e, timeStamp, users] of events) {
    if (e === 'MESSAGE') {
      switch (users) {
        // 전체 유저
        case 'ALL': {
          mentionCount = mentionCount.map((c) => c + 1);
          break;
        }
        // 온라인 유저
        case 'HERE': {
          for (let i = 0; i < numberOfUsers; i++) {
            const [status, changeOnlineTime] = userStatues[i];
            if (status === 'online') {
              mentionCount[i] += 1;
            } else if (
              status === 'offline' &&
              changeOnlineTime <= parseInt(timeStamp)
            ) {
              mentionCount[i] += 1;
              userStatues[i] = ['online', 0];
            }
          }
          break;
        }
        // 배열내 유저
        default: {
          const userList = users.split(' ');
          for (let i = 0; i < userList.length; i++) {
            const id = parseInt(userList[i].split('id')[1]);
            mentionCount[id] += 1;
          }
        }
      }
    }

    if (e === 'OFFLINE') {
      const id = parseInt(users);
      userStatues[id] = ['offline', parseInt(timeStamp) + 60];
    }
  }

  return mentionCount;
}

// [1, 0, 2]
// console.log(
//   countMentions(3, [
//     ['OFFLINE', '2', '1'],
//     ['MESSAGE', '2', 'HERE'],
//     ['OFFLINE', '1', '0'],
//     ['MESSAGE', '61', 'HERE'],
//   ]),
// );

// console.log(
//   countMentions(2, [
//     ['OFFLINE', '10', '0'],
//     ['MESSAGE', '12', 'HERE'],
//   ]),
// );

// https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-ii/?envType=daily-question&envId=2025-12-06
function maxFreeTime(
  eventTime: number,
  startTime: number[],
  endTime: number[],
): number {
  const n = startTime.length;
  const gaps = [
    startTime[0],
    ...startTime.slice(1).map((s, i) => s - endTime[i]),
    eventTime - endTime[n - 1],
  ];

  const largestRight: number[] = new Array(n + 1).fill(0);

  for (let i = n - 1; 0 <= i; i--) {
    largestRight[i] = Math.max(largestRight[i + 1], gaps[i + 1]);
  }

  return 0;
}

// console.log(maxFreeTime(11, [0, 3, 7, 9], [1, 4, 8, 10]));

//https://leetcode.com/problems/count-partitions-with-even-sum-difference/?envType=daily-question&envId=2025-12-06
function countPartitions(nums: number[]): number {
  let result = 0;
  let leftSum = 0;
  let rightSum = nums.reduce((a, b) => a + b);

  for (let i = 0; i < nums.length - 1; i++) {
    leftSum += nums[i];
    rightSum -= nums[i];

    if (Math.abs(leftSum - rightSum) % 2 === 0) {
      result++;
    }
  }

  return result;
}

// console.log(countPartitions([10, 10, 3, 7, 6]));
// console.log(countPartitions([1, 2, 2]));

// https://leetcode.com/problems/count-collisions-on-a-road/?envType=daily-question&envId=2025-12-04
function countCollisions(directions: string): number {
  const arr = directions.split('');

  let left = 0;
  while (left < arr.length && arr[left] === 'L') left++;

  let right = arr.length - 1;
  while (right >= 0 && arr[right] === 'R') right--;

  let collisions = 0;

  for (let i = left; i <= right; i++) {
    if (arr[i] !== 'S') collisions++;
  }
  return collisions;
}

// console.log(countCollisions('SSRSSRLLRSLLRSRSSRLRRRRRRLRRSSRR'));

//https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
function lengthOfLongestSubstring(s: string): number {
  let max = 0;
  let left = 0;
  const subStringSet = new Set();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    while (subStringSet.has(char)) {
      subStringSet.delete(s[left++]);
    }

    subStringSet.add(char);
    max = Math.max(max, right - left + 1);
  }

  return max;
}

// console.log(lengthOfLongestSubstring('pwwkew'));

// https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/remove-elements-within-k-distance/problem?isFullScreen=true
const debounceTimestamps = (timestamps: number[], K: number): number => {
  let prev = timestamps[0];

  return timestamps.slice(1).reduce((acc, current) => {
    if (current - prev < K) acc--;
    else prev = current;

    return acc;
  }, timestamps.length);
};

// console.log(debounceTimestamps([1, 2, 3, 8, 10], 3));

// https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/time-slot-task-pairing/problem?isFullScreen=true
const findTaskPairForSlot = (taskDurations: number[], slotLength: number) => {
  const indexMap = new Map<number, number>();

  for (let i = 0; i < taskDurations.length; i++) {
    const n = taskDurations[i];
    const complement = slotLength - n;

    if (indexMap.has(complement)) {
      return [indexMap.get(complement)!, i];
    }

    indexMap.set(n, i);
  }

  return [-1, -1];
};

// console.log(findTaskPairForSlot([2, 7, 11, 15], 9));

const findZeroSumTripletsInWindow = (
  readings: number[],
  windowSize: number,
): number[][] => {
  // Write your code here

  return [];
};

// console.log(findZeroSumTripletsInWindow([1, -2, 1, 0, 5], 3));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/longest-arithmetic-subsequence-given-diff/problem?isFullScreen=true
const findLongestArithmeticProgression = (arr: number[], k: number): number => {
  const dp = new Map<number, number>();
  return arr
    .sort((a, b) => a - b)
    .reduce((max, v) => {
      const prevLen = dp.get(v - k) ?? 0;
      const currLen = prevLen + 1;
      dp.set(v, currLen);
      return Math.max(max, currLen);
    }, 0);
};

// console.log(
//   findLongestArithmeticProgression([8, 1, -1, 0, 3, 6, 2, 4, 5, 7, 9], 2),
// );

const maximizeNonOverlappingMeetings = (meetings: number[][]): number => {
  return meetings
    .sort((a, b) => a[1] - b[1])
    .reduce(
      ([count, prevEndTime], [startTime, endTime], index) => {
        if (prevEndTime <= startTime) {
          count++;
          prevEndTime = endTime;
        }
        return [count, prevEndTime];
      },
      [0, -1],
    )[0];
};

// console.log(
//   maximizeNonOverlappingMeetings([
//     [0, 5],
//     [0, 1],
//     [1, 2],
//     [2, 3],
//     [3, 5],
//     [4, 6],
//   ]),
// );

const solution1 = (N: number, stages: number[]) => {
  const count: number[] = Array(N + 2).fill(0);

  for (const stage of stages) {
    count[stage] = count[stage] + 1;
  }

  const answer: number[] = [];
  let persons = stages.length;

  for (let i = 1; i <= N; i++) {
    answer[i] = count[i] / persons;
    persons -= count[i];
  }

  return [...answer.entries()]
    .sort(([aIndex, aFail], [bIndex, bFail]) => {
      if (aFail === bFail) return aIndex - bIndex;
      return bFail - aFail;
    })
    .map((sortingInfo) => sortingInfo[0] + 1);
};

// console.log(solution1(4, [4, 4, 4, 4, 4]));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/49994?language=javascript
 */

type DirType = 'U' | 'D' | 'R' | 'L';

class UniqKeySet {
  private set = new Set<string>();

  public isUniqueKeys(key: string | string[]) {
    if (Array.isArray(key)) {
      return key.every((k) => !this.set.has(k));
    }

    return !this.set.has(key);
  }

  public updateSet(keys: string[]) {
    keys.forEach((key) => this.set.add(key));
  }
}

const solution2 = (dirs: string) => {
  const dirMap: Record<DirType, [number, number]> = {
    U: [1, 0],
    D: [-1, 0],
    R: [0, 1],
    L: [0, -1],
  };

  const nextPositions = (
    [x, y]: [number, number],
    dir: DirType,
  ): [number, number] => {
    const [dx, dy] = dirMap[dir];
    const [nx, ny] = [dx + x, dy + y];

    return [nx, ny];
  };

  const canMove = ([x, y]: [number, number]) => {
    return -5 <= x && x <= 5 && -5 <= y && y <= 5;
  };

  const makeKey = (current: [number, number], next: [number, number]) => {
    const uniqKey1 = [...current, ...next].join('');
    const uniqKey2 = [...next, ...current].join('');

    return [uniqKey1, uniqKey2];
  };

  const set = new UniqKeySet();
  let position: [number, number] = [0, 0];
  let result = 0;

  for (const dir of dirs) {
    const next = nextPositions(position, dir as DirType);

    if (!canMove(next)) continue;

    const keys = makeKey(position, next);
    if (set.isUniqueKeys(keys)) result++;
    set.updateSet(keys);

    position = next;
  }

  return result;
};

// console.log(solution2('URULDD'));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/87390
 */
const solution3 = (n: number, left: number, right: number) => {
  const result = [];

  for (let i = left; i <= right; i++) {
    const min = Math.floor(i / n) + 1;
    const targetNum = (i % n) + 1;
    result.push(Math.max(min, targetNum));
  }

  return result;
};

// console.log(solution3(4, 7, 14));

const solution4 = (points: number[][], queries: number[][]) => {
  const ys: number[] = [];
  const xs: number[] = [];

  for (const [x, y] of points) {
    xs.push(x);
    ys.push(y);
  }

  const top = Math.max(...ys);
  const bottom = Math.min(...ys);
  const left = Math.min(...xs);
  const right = Math.max(...xs);

  console.log(top, bottom, left, right);

  const xLen = top - bottom + 1;
  const yLen = right - left + 1;

  const map = Array.from({ length: xLen }, () => Array(yLen).fill(0));

  const distY = top;
  const distX = left;

  console.log(distY, distX);

  for (const [x, y] of points) {
    // -2,-3
    const convertedY = y + distY;
    const convertedX = x + distX;

    console.log(convertedX, convertedX);
    // 여기서 컨버전이 일어나야함.
    // -3 > 5
    // -2 > 0
  }
};

// points = [[-2, -3], [0, 0], [1, 2]]
// queries = [[0, 0], [3, 5], [2, 2]]
// console.log(
//   solution4(
//     [
//       [2, -2],
//       [-2, -3],
//       [0, 0],
//       [1, 2],
//     ],
//     [
//       [0, 0],
//       [3, 5],
//       [2, 2],
//     ],
//   ),
// );
// https://school.programmers.co.kr/learn/courses/30/lessons/388352/questions

const secretCode = (n: number, q: number[][], ans: number[]) => {
  const dfs = (count: number, arr: number[], subs?: number[][]) => {
    const res: number[][] = [];
    const temp: number[] = [];

    const loop = (level: number, start: number) => {
      if (count === level) {
        const copy = [...temp];
        if (subs) {
          for (const sub of subs) {
            const candidate = [...sub, ...copy];
            if (validArray(candidate)) res.push(candidate);
          }
        } else {
          res.push(copy);
        }
        return;
      }

      for (let i = start; i < arr.length; i++) {
        temp.push(arr[i]);
        loop(level + 1, i + 1);
        temp.pop();
      }
    };

    loop(0, 0);
    return res;
  };

  const validArray = (arr: number[]) => {
    for (const [i, queryArr] of q.entries()) {
      const set = new Set(arr.concat(queryArr));
      if (10 - set.size !== ans[i]) return false;
    }
    return true;
  };

  const maxAns = Math.max(...ans);
  const maxIdx = ans.indexOf(maxAns);
  const candidate = q[maxIdx];
  const candidateSet = new Set(candidate);
  const nArray: number[] = Array.from(
    { length: n },
    (_, i: number) => i + 1,
  ).filter((n) => !candidateSet.has(n));

  const maxArray = dfs(maxAns, candidate);
  return dfs(5 - maxAns, nArray, maxArray).length;
};

// console.log(
//   secretCode(
//     10,
//     [
//       [1, 2, 3, 4, 5],
//       [6, 7, 8, 9, 10],
//       [3, 7, 8, 9, 10],
//       [2, 5, 7, 9, 10],
//       [3, 4, 5, 6, 7],
//     ],
//     [2, 3, 4, 3, 3],
//   ),
// );
// console.log(
//   secretCode(
//     15,
//     [
//       [2, 3, 9, 12, 13],
//       [1, 4, 6, 7, 9],
//       [1, 2, 8, 10, 12],
//       [6, 7, 11, 13, 15],
//       [1, 4, 10, 11, 14],
//     ],
//     [2, 1, 3, 0, 1],
//   ),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/389481
const sealedSpell = (n: number, bans: string[]) => {
  const size = 26;
  const alphabet = Array.from({ length: size }, (_, i) =>
    String.fromCharCode('a'.charCodeAt(0) + i),
  );
  let removeCount = 0;
  for (const ban of bans) {
    let len = ban.length - 1;
    let code = 0;
    for (const s of ban) {
      const idx = alphabet.indexOf(s) + 1;
      code += +len * size;
      len--;
    }
  }
};

// console.log(sealedSpell(30, ['d', 'e', 'bb', 'aa', 'ae']));
// console.log(sealedSpell(30, ['d', 'e', 'bb', 'aa', 'ae']));

// https://school.programmers.co.kr/learn/courses/30/lessons/258709

const selectDice = (dice: number[][]) => {
  const canPickIndexes = (
    level: number = 0,
    result: number[][] = [],
    temp: number[] = [],
  ) => {
    if (half === level) {
      result.push([...temp]);
      return;
    }

    for (let i = 0; i < 6; i++) {
      temp.push(i);
      canPickIndexes(level + 1, result, temp);
      temp.pop();
    }
    return result;
  };

  const dfs = (
    level: number = 0,
    start: number = 0,
    result: number[][] = [],
    temp: number[] = [],
  ) => {
    if (half === level) {
      result.push([...temp]);
      return;
    }

    for (let i = start; i < size; i++) {
      temp.push(i);
      dfs(level + 1, i + 1, result, temp);
      temp.pop();
    }

    return result;
  };

  const getScores = (indexes: number[]) => {
    const scores: number[] = [];

    for (const indexSet of pickIndexes) {
      let score = 0;
      for (const [i, x] of indexSet.entries()) {
        score += dice[indexes[i]][x];
      }
      scores.push(score);
    }
    scores.sort((a, b) => a - b);

    return scores;
  };

  const getWinCount = (arr1: number[], arr2: number[]) => {
    const maxValue = Math.max(...arr1, ...arr2);
    const count = new Array(maxValue + 1).fill(0);
    for (const v of arr2) count[v]++;

    const prefix = [...count];
    for (let i = 2; i <= maxValue; i++) prefix[i] += prefix[i - 1];

    let result = 0;
    for (const n of arr1) result += prefix[n - 1] ?? 0;

    return result;
  };

  const size = dice.length;
  const half = size / 2;
  const indexes = Array.from({ length: size }, (_, i) => i);
  const pickIndexes = canPickIndexes()!;
  const combinableIndexes = dfs()!;
  const maps = new Map<string, number[]>();
  let maxWinCount = 0;
  let result: number[] = [];

  for (const my of combinableIndexes) {
    const you = indexes.filter((v) => !my.includes(v));
    const myKey = my.join('');
    const youKey = you.join('');

    if (!maps.has(myKey)) maps.set(myKey, getScores(my));
    if (!maps.has(youKey)) maps.set(youKey, getScores(you));
    let winCount = getWinCount(maps.get(myKey)!, maps.get(youKey)!);

    if (winCount > maxWinCount) {
      maxWinCount = winCount;
      result = [...my];
    }
  }
  return result.map((v) => v + 1);
};

// console.log(
//   selectDice([
//     [1, 2, 3, 4, 5, 6],
//     [3, 3, 3, 3, 4, 4],
//     [1, 3, 3, 4, 4, 4],
//     [1, 1, 4, 4, 5, 5],
//     [1, 1, 4, 4, 5, 5],
//     [1, 1, 4, 4, 5, 5],
//   ]),
// );
// console.log(
//   selectDice([
//     [40, 41, 42, 43, 44, 45],
//     [43, 43, 42, 42, 41, 41],
//     [1, 1, 80, 80, 80, 80],
//     [70, 70, 1, 1, 70, 70],
//   ]),
// );

const bandaging = (bandage: number[], health: number, attacks: number[][]) => {
  const max = health;
  const bonus = bandage[2];
  let prev = 0;
  for (const [time, damage] of attacks) {
    // const sequenceTime = time - prev;
    // const bonus = Math.floor(sequenceTime/)
  }
};

// 시전 시간, 초당 회복량, 추가 회복량
// console.log(
//   bandaging([5, 1, 5], 30, [
//     [2, 10],
//     [9, 15],
//     [10, 5],
//     [11, 5],
//   ]),
// );

//https://school.programmers.co.kr/learn/courses/30/lessons/178871
const calling = (players: string[], callings: string[]) => {
  const rankMap = new Map<string, number>();
  players.forEach((v, i) => rankMap.set(v, i));

  for (const caller of callings) {
    const callerRank = rankMap.get(caller)!;
    const callerPrevRankName = players[callerRank - 1];

    // array swap
    [players[callerRank], players[callerRank - 1]] = [
      players[callerRank - 1],
      players[callerRank],
    ];

    // rankMap swap
    rankMap.set(caller, callerRank - 1);
    rankMap.set(callerPrevRankName, callerRank);
  }

  return players;
};

// console.log(
//   calling(
//     ['mumu', 'soe', 'poe', 'kai', 'mine'],
//     ['kai', 'kai', 'mine', 'mine'],
//   ),
// );

//https://school.programmers.co.kr/learn/courses/30/lessons/68646
const solution5 = (a: number[]) => {
  // 더 큰 풍선만 터트릴수 있다. -> 가장 작은 풍선이 남는다.
  // 1회 더 작은 풍선을 터트릴 수 있다.
  const n = a.length;

  const leftMin = Array.from({ length: n }, () => Infinity);
  leftMin[0] = a[0];
  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], a[i]);
  }

  const rightMin = Array.from({ length: n }, () => Infinity);
  rightMin[n - 1] = a[n - 1];
  for (let i = n - 2; 0 <= i; i--) {
    rightMin[i] = Math.min(rightMin[i + 1], a[i]);
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] <= leftMin[i] || a[i] <= rightMin[i]) {
      result++;
    }
  }

  return result;
};

// console.log(solution5([-16, 27, 65, -2, 58, -92, -71, -68, -61, -33]));

const solution6 = (user_id: string[], banned_id: string[]) => {
  const getCombinations = (candidates: string[][]) => {
    const result = new Set<string>();
    const usedNames = new Set<string>();

    const dfs = (level: number) => {
      if (level === banned_id.length) {
        const key = [...usedNames.values()].sort().join(',');
        result.add(key);
        return;
      }

      for (const userId of candidates[level] ?? []) {
        if (!usedNames.has(userId)) {
          usedNames.add(userId);
          dfs(level + 1);
          usedNames.delete(userId);
        }
      }
    };

    dfs(0);
    return result;
  };

  const isAllStar = (x: string) => {
    return [...x].every((a) => a === '*');
  };

  const isMatch = (target: string, str: string) => {
    for (let i = 0; i < target.length; i++) {
      if (target[i] === '*') continue;
      if (target[i] !== str[i]) return false;
    }
    return true;
  };

  const sizes = new Map<number, string[]>();
  for (const string of user_id) {
    const size = string.length;
    if (!sizes.has(size)) sizes.set(size, []);
    sizes.get(size)?.push(string);
  }

  let result = [];
  for (const banId of banned_id) {
    const size = banId.length;
    const candidates = sizes.get(size) ?? [];

    if (isAllStar(banId)) {
      result.push(candidates);
    } else {
      const currArr = [];
      for (const str of candidates) {
        if (isMatch(banId, str)) currArr.push(str);
      }
      if (currArr.length) result.push(currArr);
    }
  }

  return getCombinations(result).size;
};

// console.log(
//   solution6(
//     ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
//     ['fr*d*', '*rodo', '******', '******'],
//   ),
// );

//https://www.hackerrank.com/challenges/the-birthday-bar/problem?isFullScreen=true
const birthday = (s: number[], d: number, m: number) => {
  return s
    .reduce(
      (acc, v, index) => {
        acc[index + 1] = acc[index] + v;
        return acc;
      },
      Array(s.length + 1).fill(0) as number[],
    )
    .map((_, i, array) => (m <= i ? array[i] - array[i - m] : null))
    .filter((v) => v === d).length;
};

// console.log(birthday([2, 2, 1, 3, 2], 4, 2));

const divisibleSumPairs = (n: number, k: number, ar: number[]) => {
  let result = 0;
  const dfs = (start: number = 0, level: number = 0, sum: number = 0) => {
    if (level === 2) {
      if (sum % k === 0) result++;
      return;
    }

    for (let i = start; i < ar.length; i++) {
      dfs(i + 1, level + 1, sum + ar[i]);
    }
  };

  dfs();
  return result;
};

// console.log(divisibleSumPairs(6, 3, [1, 3, 2, 6, 1, 2]));

const migratoryBirds = (arr: number[]) => {
  return [
    ...arr
      .reduce(
        (acc, v) => acc.set(v, acc.get(v)! + 1),
        new Map<number, number>(
          Array.from({ length: 5 }, (_, i) => [i + 1, 0]),
        ),
      )
      .entries(),
  ].reduce((max, current) => (max[1] < current[1] ? current : max))[0];
};

// console.log(migratoryBirds([1, 4, 4, 4, 5, 3]));

//https://school.programmers.co.kr/learn/courses/30/lessons/250137
const solution7 = (bandage: number[], health: number, attacks: number[][]) => {
  const [시전시간, 초당회복량, 추가회복량] = bandage;
  const [첫공격시간, 첫피해량] = attacks.shift()!;
  const maxHealth = health;

  let prevAttackTime = 첫공격시간;
  health -= 첫피해량;
  for (const [공격시간, 피해량] of attacks) {
    const tempTime = 공격시간 - prevAttackTime - 1;

    if (0 < tempTime) {
      health += tempTime * 초당회복량;
      health += Math.floor(tempTime / 시전시간) * 추가회복량;
      health = Math.min(health, maxHealth);
    }

    prevAttackTime = 공격시간;
    health -= 피해량;
    if (health <= 0) return -1;
  }

  return health;
};

// console.log(
//   solution7([5, 1, 5], 30, [
//     [2, 10],
//     [9, 15],
//     [10, 5],
//     [11, 5],
//   ]),
// );

const solution8 = (picks: number[], minerals: string[]) => {
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

  const getCost = (start: number, end: number, pick: number) => {
    let cost = 0;

    for (let i = start; i < end && i < minerals.length; i++) {
      const mineral = minerals[i];
      cost += costTable.get(pick)?.get(mineral)!;
    }

    return cost;
  };

  let result = Number.MAX_SAFE_INTEGER;
  const dfs = (start: number, curPicks: number[], cost: number) => {
    if (result < cost) return;

    if (minerals.length < start || curPicks.every((p) => p === 0)) {
      result = Math.min(result, cost);
      return;
    }

    for (const [index, pick] of curPicks.entries()) {
      if (pick === 0) continue;
      const newPicks = [...curPicks];
      newPicks[index]--;
      dfs(start + 5, newPicks, getCost(start, start + 5, index) + cost);
    }
  };

  dfs(0, [...picks], 0);

  return result;
};

// https://www.hackerrank.com/challenges/non-divisible-subset/problem?isFullScreen=true

const nonDivisibleSubset = (k: number, s: number[]): number => {
  const remains = Array.from({ length: k }, () => 0);

  s.forEach((num) => {
    remains[num % k] += 1;
  });

  let max = 0 < remains[0] ? 1 : 0;
  for (let r = 1; r <= Math.floor(remains.length / 2); r++) {
    if (r === k / 2) {
      max += 1;
    } else {
      max += Math.max(remains[r], remains[k - r]);
    }
  }

  return max;
};

// console.log(nonDivisibleSubset(4, [19, 10, 12, 10, 24, 25, 22]));

// https://www.hackerrank.com/challenges/angry-children/problem?isFullScreen=true
const maxMin = (k: number, arr: number[]): number => {
  return arr
    .sort((a, b) => b - a)
    .reduce((result, curr, index, array) => {
      const maxIndex = index + k - 1;
      if (arr.length <= maxIndex) return result;
      return Math.min(curr - array[maxIndex], result);
    }, Number.MAX_SAFE_INTEGER);
};

// console.log(maxMin(3, [10, 100, 300, 200, 1000, 20, 30]));
// console.log(maxMin(4, [1, 2, 3, 4, 10, 20, 30, 40, 100, 200]));

const squares = (a: number, b: number): number => {
  return Math.floor(Math.sqrt(b)) - Math.ceil(Math.sqrt(a)) + 1;
};

// console.log(squares(465868129, 988379794));

// https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/merge-and-sort-intervals/problem?isFullScreen=true
const mergeHighDefinitionIntervals = (intervals: number[][]): number[][] => {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [s, e] = intervals[i];
    if (s <= result[result.length - 1][1]) {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], e);
    } else {
      result.push([s, e]);
    }
  }

  return result;
};

// console.log(mergeHighDefinitionIntervals([[1, 3]]));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/count-elements-greater-than-previous-average/problem?isFullScreen=true
const countResponseTimeRegressions = (responseTimes: number[]): number => {
  return responseTimes.slice(1).reduce(
    ({ count, prefixSum }, curr, index) => {
      const newSum = prefixSum + curr;
      const average = newSum / (index + 2);
      return {
        count: average < curr ? count + 1 : count,
        prefixSum: newSum,
      };
    },
    { count: 0, prefixSum: responseTimes[0] },
  ).count;
};

// console.log(countResponseTimeRegressions([100, 200, 150, 300]));

const countSubarraysWithSumAndMaxAtMost = (
  nums: number[],
  k: number,
  M: number,
): number => {
  return 0;
};

// console.log(countSubarraysWithSumAndMaxAtMost([2, -1, 2, 1, -2, 3], 3, 2));

function countAffordablePairs(prices: number[], budget: number): number {
  let result = 0;
  for (let i = prices.length - 1; 0 <= i; i--) {
    if (budget < prices[i]) continue;

    for (let j = i - 1; 0 <= j; j--) {
      if (prices[i] + prices[j] <= budget) {
        result += j + 1;
        break;
      }
    }
  }
  return result;
}

// console.log(countAffordablePairs([1, 2, 3, 4, 5], 7));
