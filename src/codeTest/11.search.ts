export default {};

function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (const [i, num] of nums.entries()) {
    if (map.has(target - num)) {
      return [map.get(target - num)!, i];
    }
    map.set(num, i);
  }

  return [];
}

console.log(twoSum([3, 2, 4], 6));

//https://www.hackerrank.com/challenges/the-grid-search/problem?isFullScreen=true
function gridSearch(G: string[], P: string[]): string {
  const pattenSize = P[0].length;

  for (let i = 0; i < G.length; i++) {
    const s = G[i];

    let startIndex = s.indexOf(P[0]);
    while (startIndex !== -1) {
      let isMatch = true;

      for (let j = 1; j < P.length; j++) {
        if (G[i + j].substring(startIndex, startIndex + pattenSize) !== P[j]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        return 'YES';
      }

      startIndex = s.indexOf(P[0], startIndex + 1);
    }
  }

  return 'NO';
}

// 400453592126560
// 114213133098692
// 474386082879648
// 522356951189169
// 887109450487496
// 252802633388782
// 502771484966748
// 075975207693780
// 511799789562806
// 404007454272504
// 549043809916080
// 962410809534811
// 445893523733475
// 768705303214174
// 650629270887160

console.log(
  gridSearch(
    [
      '400453592126560',
      '114213133098692',
      '474386082879648',
      '522356951189169',
      '887109450487496',
      '252802633388782',
      '502771484966748',
      '075975207693780',
      '511799789562806',
      '404007454272504',
      '549043809916080',
      '962410809534811',
      '445893523733475',
      '768705303214174',
      '650629270887160',
    ],
    ['99', '99'],
  ),
);

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/zero-sum-triplets-within-sliding-window/problem?isFullScreen=true
function findZeroSumTripletsInWindow(readings: number[], windowSize: number) {
  const resultMap = new Map<string, number[]>();

  for (let i = 0; i < readings.length; i++) {
    const current = readings[i];
    const set = new Set<number>();
    const end = Math.min(i + windowSize, readings.length);

    for (let j = i + 1; j < end; j++) {
      const v = readings[j];
      const complement = -(current + v);

      if (set.has(complement)) {
        const triplet = [current, complement, v];
      }

      set.add(v);
    }
  }
  return Array.from(resultMap.values());
}

// console.log(findZeroSumTripletsInWindow([0, -1, 1, 0], 4));

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/search-timestamp-in-rotated-log-timestamps/problem?isFullScreen=true
function searchRotatedTimestamps(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // 왼쪽이 정렬된 상태?
    if (nums[left] <= nums[mid]) {
      // 왼쪽 범위에 있을경우?
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
        // 해당 범위가 아닐경우?
      } else {
        left = mid + 1;
      }
    }

    // 오른쪽이 정렬된 상태
    if (nums[mid] <= nums[right]) {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// console.log(
//   searchRotatedTimestamps(
//     [1609466400, 1609470000, 1609473600, 1609459200, 1609462800],
//     1609459200,
//   ),
// );

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/find-peak-element-in-bitonic-array/problem?isFullScreen=true
const findPeakIndex = (counts: number[]): number => {
  let left = 0;
  let right = counts.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (counts[mid + 1] < counts[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

// console.log(findPeakIndex([1, 3, 5, 6, 4, 2]));

const binarySearch = (nums: number[], target: number) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};

// console.log(binarySearch([1, 2, 3, 4, 5], 3));

const gridlandMetro = (
  n: number,
  m: number,
  k: number,
  track: number[][],
): number => {
  let result = n * m;
  const maps: number[][][] = [];

  const isSubset = (pos1: [number, number], pos2: [number, number]) => {
    // 4,6
    const [s1, e1] = pos1;
    //3 ,5
    const [s2, e2] = pos2;
    return (s2 <= s1 && s1 <= e2) || (s1 <= e2 && e1 <= e2);
  };

  for (const trackInfo of track) {
    const [row, c1, c2] = trackInfo;

    if (!maps[row]) maps[row] = [[c1, c2]];
    else {
      const ranges = maps[row];
      const len = ranges.length;
      let isInRanges = false;

      // for (let i = 0; i < len; i++) {
      //   const [s, e] = ranges[i];
      //   // 현재 있는 애중에 하나라도 범위에 있다면
      //   if (s) const min = Math.min(c1, s);
      //   const max = Math.max(c2, e);
      //   ranges[i] = [min, max];
      // }
    }
  }

  maps.forEach((ranges) => {
    if (!ranges) return;
    for (const [s, e] of ranges) {
      // result -= e - s + 1;
      result += e - s - 1;
    }
  });

  return result;
};

// console.log(
//   gridlandMetro(4, 4, 3, [
//     [2, 2, 3],
//     [3, 1, 4],
//     [4, 4, 4],
//   ]),
// );
// console.log(
//   gridlandMetro(1, 6, 3, [
//     [1, 1, 1],
//     [1, 4, 5],
//     [1, 3, 6],
//   ]),
// );

// https://www.hackerrank.com/challenges/hackerland-radio-transmitters/problem?isFullScreen=true
const hackerlandRadioTransmitters = (x: number[], k: number): number => {
  x.sort((a, b) => a - b);
  let result = 0;
  let currentX = x[0];

  for (let i = 0; i < x.length; i++) {
    currentX = x[i];

    let j = i + 1;
    while (x[j] <= currentX + k) j++;

    if (i !== j - 1) {
      const tempLoc = x[j - 1];
      while (x[j] <= tempLoc + k) j++;
      i = j - 1;
    }

    result++;
  }

  return result;
};

// console.log(hackerlandRadioTransmitters([7, 2, 4, 6, 5, 9, 12, 11], 2));
// console.log(hackerlandRadioTransmitters([9, 5, 4, 2, 6, 15, 12], 2));

const minimumLoss = (price: number[]): number => {
  const indexMap = new Map<number, number>();
  price.forEach((v, index) => {
    indexMap.set(v, index);
  });

  price.sort((a, b) => a - b);

  let result = Infinity;

  for (let i = 0; i < price.length - 1; i++) {
    // next가 더 빠른 인덱스여야한다.
    if (indexMap.get(price[i + 1])! < indexMap.get(price[i])!) {
      result = Math.min(result, price[i + 1] - price[i]);
    }
  }

  return result;
};

// console.log(minimumLoss([20, 7, 8, 2, 5]));

const missingNumbers = (arr: number[], brr: number[]): number[] => {
  const makeCountMap = (arr: number[]) => {
    const map = new Map<number, number>();

    for (const n of arr) {
      const value = map.get(n) ?? 0;
      map.set(n, value + 1);
    }

    return map;
  };

  const arrCount = makeCountMap(arr);
  const brrCount = makeCountMap(brr);

  const result: number[] = [];

  for (const [n, count] of brrCount.entries()) {
    if (!arrCount.has(n) || count > arrCount.get(n)!) {
      result.push(n);
    }
  }

  return result.sort((a, b) => a - b);
};

// console.log(missingNumbers([7, 2, 5, 3, 5, 3], [7, 2, 5, 4, 6, 3, 5, 3]));

const pairs = (k: number, arr: number[]): number => {
  const set = new Set(arr);
  let result = 0;

  for (const n of arr) {
    if (set.has(n + k)) {
      result++;
    }
  }
  return result;
};

// console.log(pairs(2, [1, 5, 3, 4, 2]));

const balancedSums = (arr: number[]): string => {
  const totalSum = arr.reduce((a, b) => a + b);
  let currentSum = 0;
  let result = 'NO';

  for (const n of arr) {
    if (currentSum === totalSum - n - currentSum) return 'YES';
    currentSum += n;
  }

  return result;
};

// console.log(balancedSums([2, 0, 0, 0]));
// console.log(balancedSums([2, 0, 2, 2]));

// const maximumSum = (a: number[], m: number): number => {
//   if (m === 1) return Math.max(...a);
//   // Write your code here
// };

// console.log([3, 3, 9, 9, 5], 7);

//https://www.hackerrank.com/challenges/playing-with-numbers/problem?isFullScreen=true
// 다시
const playingWithNumbers = (arr: number[], queries: number[]): number[] => {
  arr.sort((a, b) => a - b);
  const n = arr.length;

  // 해당 인덱스 까지 음수
  const getNegIdx = (q: number) => {
    let left = 0;
    let right = n - 1;
    let idx = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] + q < 0) {
        idx = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return idx;
  };

  const prefixSum: number[] = arr.reduce((acc, curr, idx) => {
    acc[idx] = curr + (acc[idx - 1] ?? 0);
    return acc;
  }, [] as number[]);

  const result: number[] = [];
  let querySum = 0;

  for (const query of queries) {
    querySum += query;
    let sum = 0;
    const idx = getNegIdx(querySum);

    if (idx >= 0) {
      const negSum = prefixSum[idx];
      const negCount = idx + 1;
      sum += -negSum + -(querySum * negCount);
    }

    if (idx < n - 1) {
      const posSum = prefixSum[n - 1] - (idx === -1 ? 0 : prefixSum[idx]);
      const posCount = n - (idx + 1);
      sum += posSum + posCount * querySum;
    }

    result.push(sum);
  }

  return result;
};

// console.log(playingWithNumbers([-1, 2, -3], [1, -2, 3]));
// console.log(playingWithNumbers([1, 2, 3], [1, -2, 3]));
// console.log(playingWithNumbers([-5, -3, -2, 0, 1, 2, 3], [-2]));

// https://www.hackerrank.com/challenges/making-candies/problem?isFullScreen=true
const minimumPasses = (m: number, w: number, p: number, n: number): number => {
  const canReachInDays = (days: number) => {
    let cm = m;
    let cw = w;
    let currentCandies = 0;
    let currentDay = 0;

    while (currentDay < days) {
      const dailyProduction = cm * cw;

      const maxPossible =
        currentCandies + dailyProduction * (days - currentDay);
      if (maxPossible >= n) return true;

      // 사탕이 p보다 적으면 건너뛰기
      if (currentCandies < p) {
        const need = Math.ceil((p - currentDay) / dailyProduction);
        if (currentDay + need > days) return false;
        currentDay += need;
        currentCandies += need * dailyProduction;
      }

      // 구매 가능한 만큼 구매
      const canBuyCount = Math.floor(currentCandies / p);
      const totalUnits = cw + cm + canBuyCount;
      const half = Math.floor(totalUnits / 2);

      if (cm > cw) {
        cm = Math.max(cm, half);
        cw = totalUnits - cm;
      } else {
        cw = Math.max(cw, half);
        cm = totalUnits - cw;
      }

      currentCandies -= canBuyCount * p;
      currentCandies += cm * cw;
      currentDay++;
    }
  };

  let low = 1;
  let high = n;
  let answer = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canReachInDays(mid)) {
      answer = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return answer;
};

// console.log(minimumPasses(3, 1, 2, 12));
// console.log(minimumPasses(1, 1, 6, 45));
// console.log(minimumPasses(1, 1, 1000000000000, 1000000000000));
// console.log(minimumPasses(1, 100, 10000000000, 1000000000000));
// console.log(minimumPasses(1, 1, 1000000000000, 1000000000000));
// console.log(minimumPasses(2, 1, 9, 9));
// console.log(minimumPasses(1, 2, 1, 60));
