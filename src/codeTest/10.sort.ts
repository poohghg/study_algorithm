export default {};

function sortMatrix(grid: number[][]): number[][] {
  const n = grid.length;
  const result = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    const temp: number[] = [];

    for (let j = 0; j < n - i; j++) {
      temp.push(grid[i + j][j]);
    }

    temp.sort((a, b) => b - a);
    for (let j = 0; j < n - i; j++) {
      result[i + j][j] = temp[j];
    }
  }

  for (let i = 1; i < n; i++) {
    const temp: number[] = [];
    for (let j = 0; j < n - i; j++) {
      temp.push(grid[j][i + j]);
    }

    temp.sort((a, b) => a - b);

    for (let j = 0; j < n - i; j++) {
      result[j][i + j] = temp[j];
    }
  }

  return result;
}

console.log(
  sortMatrix([
    [1, 7, 3],
    [9, 8, 2],
    [4, 5, 6],
  ]),
);

//https://leetcode.com/problems/relative-sort-array/?envType=problem-list-v2&envId=counting-sort
function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  const indexMap = arr2.reduce((map, b, i) => {
    map.set(b, i);
    return map;
  }, new Map<number, number>());

  return arr1.sort((a, b) => {
    const aIndex = indexMap.get(a) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = indexMap.get(b) ?? Number.MAX_SAFE_INTEGER;

    if (
      aIndex === Number.MAX_SAFE_INTEGER &&
      bIndex === Number.MAX_SAFE_INTEGER
    ) {
      return a - b;
    }

    return aIndex - bIndex;
  });
}

// console.log(relativeSortArray([28, 22, 6, 8, 44, 17], [22, 28, 8, 6]));

// [1,1,2,2,3,_]
// console.log(removeDuplicatesTwo([1, 1, 1, 2, 2, 3]));
// [0,0,1,1,2,3,3,_,_]
// console.log(removeDuplicatesTwo([0, 0, 1, 1, 1, 1, 2, 3, 3]));

//https://leetcode.com/problems/array-partition/?envType=problem-list-v2&envId=counting-sort
/**
 * 1.
 * 배열을 정렬한다. 배열을 정렬하면 가장 작은 숫자들이 서로 인접하게 된다. 이렇게 하면 인접한 숫자들을 짝지어 가장 작은 값들의 합을 최대화할 수 있다.
 * 2.
 * 복잡성
 * 시간 복잡도: O(n logn)
 */

function arrayPairSum(nums: number[]): number {
  let result = 0;
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i += 2) {
    result += nums[i];
  }

  return result;
}

// console.log(arrayPairSum([6, 2, 6, 5, 1, 2]));

// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
function removeDuplicates(nums: number[]): number {
  let index = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] !== nums[i]) {
      nums[index] = nums[i];
      index++;
    }
  }
  return index;
}

// console.log(removeDuplicates([1, 1, 2]));
// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

//https://leetcode.com/problems/remove-element/
function removeElement(nums: number[], val: number): number {
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[index] = nums[i];
      index++;
    }
  }

  return index;
}

// console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));

// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
function searchRange(nums: number[], target: number): number[] {
  const targetIndex = nums.indexOf(target);
  if (targetIndex === -1) return [-1, -1];

  let lastIndex = targetIndex;
  while (lastIndex < nums.length - 1 && nums[lastIndex + 1] === target) {
    lastIndex++;
  }

  return [targetIndex, lastIndex];
}

// console.log(searchRange([5, 7, 7, 8, 8], 8));

// https://leetcode.com/problems/median-of-two-sorted-arrays/
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const size = nums1.length + nums2.length;
  const isEven = size % 2 === 0;

  const getMidianIndexes = (size: number): number[] => {
    const mid = Math.floor(size / 2);
    return isEven ? [mid - 1, mid] : [mid];
  };

  const getMedian = () => {
    const array: number[] = [];
    let index = 0;
    let array1Index = 0;
    let array2Index = 0;

    const lastIndex = getMidianIndexes(size).at(-1)!;

    while (
      array1Index < nums1.length &&
      array2Index < nums2.length &&
      index <= lastIndex
    ) {
      if (nums1[array1Index] < nums2[array2Index]) {
        array.push(nums1[array1Index]);
        array1Index++;
      } else {
        array.push(nums2[array2Index]);
        array2Index++;
      }
      index++;
    }

    while (array1Index < nums1.length && index <= lastIndex) {
      array.push(nums1[array1Index]);
      array1Index++;
      index++;
    }

    while (array2Index < nums2.length && index <= lastIndex) {
      array.push(nums2[array2Index]);
      array2Index++;
      index++;
    }

    return isEven
      ? (array[index - 2] + array[index - 1]) / 2
      : array[index - 1];
  };

  return getMedian();
}

// console.log(findMedianSortedArrays([1, 2], [3]));

const radixSort = (arr: number[]) => {
  const getDigit = (num: number, place: number) => {
    return Math.floor((Math.abs(num) / 10 ** place) % 10);
  };

  const digitCount = (num: number) => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
  };

  const maxDigit = (arr: number[]) => {
    let max = 0;
    for (const number of arr) max = Math.max(digitCount(number), max);
    return max;
  };

  const maxK = maxDigit(arr);
  let sortArr = arr.slice();

  for (let i = 0; i <= maxK; i++) {
    const buckets = Array.from({ length: 10 }, (): number[] => []);
    for (const number of sortArr) {
      const digitOfNum = getDigit(number, i);
      buckets[digitOfNum].push(number);
    }
    sortArr = buckets.flat();
  }

  return sortArr;
};

// console.log(radixSort([11, 321, 12, 5, 3, 27, 1, 0]));

// https://school.programmers.co.kr/learn/courses/30/lessons/42746
// 가장 큰수
const maxNum = (numbers: number[]) => {
  const toNum = (s: string) => parseInt(s, 10);
  numbers.sort((a, b) => {
    const astr = a.toString();
    const bstr = b.toString();
    return toNum(bstr + astr) - toNum(astr + bstr);
  });

  return numbers[0] === 0 ? '0' : numbers.join('');
};

// console.log(maxNum([0]));

const nTuple = (s: string) => {
  const arr = s
    .slice(2, -2)
    .split('},{')
    .sort((a, b) => a.length - b.length);
  const result: number[] = [];

  for (const string of arr) {
    const subArray = string.split(',').map((v) => Number(v));
    for (const num of subArray) {
      if (!result.includes(num)) {
        result.push(num);
      }
    }
  }

  return result;
};

// console.log(nTuple('{{2},{2,1},{2,1,3},{2,1,3,4}}'));

class MiniHeap<T> {
  private readonly data: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number, init?: T[]) {
    this.compare = compare;
    if (init) {
      init.forEach((v) => {
        this.push(v);
      });
    }
  }

  get size() {
    return this.data.length;
  }

  get copy() {
    return [...this.data];
  }

  push(value: T) {
    this.data.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size === 0) return null;
    if (this.size === 1) return this.data.pop();

    this.swapValue(0, this.size - 1);
    const min = this.data.pop();
    this.bubbleDown();
    return min;
  }

  private bubbleUp() {
    let index = this.size - 1;
    while (0 < index) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (0 < this.compare(this.data[index], this.data[parentIndex])) break;
      this.swapValue(index, parentIndex);
      index = parentIndex;
    }
  }

  private bubbleDown() {
    let index = 0;

    while (index < this.size) {
      const [leftIndex, rightIndex] = [index * 2 + 1, index * 2 + 2];
      let minIndex = index;

      if (
        leftIndex < this.size &&
        0 < this.compare(this.data[minIndex], this.data[leftIndex])
      )
        minIndex = leftIndex;

      if (
        rightIndex < this.size &&
        0 < this.compare(this.data[minIndex], this.data[rightIndex])
      )
        minIndex = rightIndex;

      if (minIndex === index) break;
      this.swapValue(minIndex, index);
      index = minIndex;
    }
  }

  private swapValue(a: number, b: number) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }
}

// https://school.programmers.co.kr/learn/courses/30/lessons/62050

const moveLand = (land: number[][], height: number) => {
  const n = land.length;
  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const isValid = (x: number, y: number) => 0 <= x && x < n && 0 <= y && y < n;

  const bfs = () => {
    let result = 0;
    const visited = Array.from({ length: n }, (): number[] => Array(n).fill(0));
    const q = new MiniHeap<[number, number, number]>((a, b) => a[0] - b[0]);
    q.push([0, 0, 0]);

    while (q.size) {
      const [cost, x, y] = q.pop()!;

      if (visited[x][y] === 0) {
        visited[x][y] = 1;
        result += cost;
        const currentH = land[x][y];
        for (const [dx, dy] of moves) {
          const [nx, ny] = [x + dx, y + dy];
          if (isValid(nx, ny)) {
            const diff = Math.abs(currentH - land[nx][ny]);
            const nxCost = diff <= height ? 0 : diff;
            q.push([nxCost, nx, ny]);
          }
        }
      }
    }
    return result;
  };
  return bfs();
};

// console.log(
//   moveLand(
//     [
//       [10, 11, 10, 11],
//       [2, 21, 20, 10],
//       [1, 20, 21, 11],
//       [2, 1, 2, 1],
//     ],
//     1,
//   ),
// );

const countingSort = (arr: number[]): number[] => {
  const count = Array(100).fill(0);
  for (const number of arr) count[number] = count[number] + 1;

  const sortedArr: number[] = [];

  count.forEach((countElement, idx) => {
    for (let i = 0; i < countElement; i++) {
      sortedArr.push(idx);
    }
  });

  return sortedArr;
};

// console.log(countingSort([3, 4, 5, 10, 3]));

const minOfficesToRemove = (branches: number[]) => {
  const half = Math.floor(branches.length / 2);
  const count = new Map<number, number>();

  for (const b of branches) count.set(b, (count.get(b) || 0) + 1);

  const maxValue = Math.max(...count.values());
  // 각 카운트 내 원소를 버켓에 저장한다.
  const buckets = Array.from({ length: maxValue + 1 }, (): number[] => []);

  for (const [num, cnt] of count.entries()) {
    buckets[cnt].push(num);
  }

  let removed = 0;
  for (let k = maxValue; 1 <= k; k--) {
    for (const idx of buckets[k]) {
      removed += k;
      if (removed >= half) {
        return removed;
      }
    }
  }
};

// console.log(minOfficesToRemove([1, 1, 2, 3])); // [1]
// console.log(minOfficesToRemove([1, 2, 3, 4, 5, 5, 5, 5])); // [5]
// console.log(minOfficesToRemove([1, 2, 3, 4, 5, 6])); // [1, 2, 3]

const countSort = (arr: string[][]) => {
  const half = Math.floor(arr.length / 2);
  const buckets = Array.from({ length: 100 }, (): string[] => []);

  for (let i = 0; i < arr.length; i++) {
    const [idx, v] = arr[i];
    const targetV = i < half ? '-' : v;
    buckets[+idx].push(targetV);
  }

  return buckets.flat().join(' ');
};

// console.log(
//   countSort([
//     ['0', 'ab'],
//     ['6', 'cd'],
//     ['0', 'ef'],
//     ['6', 'gh'],
//     ['4', 'ij'],
//     ['0', 'ab'],
//     ['6', 'cd'],
//     ['0', 'ef'],
//     ['6', 'gh'],
//     ['0', 'ij'],
//     ['4', 'that'],
//     ['3', 'be'],
//     ['0', 'to'],
//     ['1', 'be'],
//     ['5', 'question'],
//     ['1', 'or'],
//     ['2', 'not'],
//     ['4', 'is'],
//     ['2', 'to'],
//     ['4', 'the'],
//   ]),
// );

const closestNumbers = (arr: number[]): number[] => {
  const set = new Set(arr);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  let result: number[] = [];
  let prev = min;
  let mifDiff = Infinity;

  for (let i = min + 1; i <= max; i++) {
    if (!set.has(i)) continue;

    if (i - prev === mifDiff) {
      result.push(i, prev);
    } else if (i - prev < mifDiff) {
      result = [i, prev];
      mifDiff = Math.abs(i - prev);
    }
    prev = i;
  }
  return result;
};

// console.log(
//   closestNumbers([
//     -20, -3916237, -357920, -3620601, 7374819, -7330761, 30, 6246457, -6461594,
//     266854, -520, -470,
//   ]),
// );

const findMedian = (arr: number[]): number => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const count = new Map<number, number>();
  for (const n of arr) {
    const v = count.get(n) || 0;
    count.set(n, v + 1);
  }

  let currentSize = Math.ceil(arr.length / 2);
  for (let i = min; i < max; i++) {
    if (count.has(i)) {
      currentSize -= count.get(i)!;
      if (currentSize <= 0) return i;
    }
  }

  return arr[0];
};

// console.log(findMedian([0, 1, 2, 4, 6, 5, 3]));

const insertionSortCount = (arr: number[]): number => {
  const merge = (arr1: number[], arr2: number[]): [number[], number] => {
    let arr1Idx = 0;
    let arr2Idx = 0;
    let swapCount = 0;
    const arr: number[] = [];

    while (arr1Idx < arr1.length && arr2Idx < arr2.length) {
      if (arr1[arr1Idx] <= arr2[arr2Idx]) {
        arr.push(arr1[arr1Idx++]);
      } else {
        arr.push(arr2[arr2Idx++]);
        swapCount += arr1.length - arr1Idx;
      }
    }

    while (arr1Idx < arr1.length) arr.push(arr1[arr1Idx++]);
    while (arr2Idx < arr2.length) arr.push(arr2[arr2Idx++]);

    return [arr, swapCount];
  };

  const mergeSortAndCount = (arr: number[]): [number[], number] => {
    if (arr.length <= 1) return [arr, 0];

    const mid = Math.floor(arr.length / 2);
    const [left, leftCount] = mergeSortAndCount(arr.slice(0, mid));
    const [right, rightCount] = mergeSortAndCount(arr.slice(mid));
    const [sortArr, count] = merge(left, right);
    return [sortArr, count + leftCount + rightCount];
  };

  const [_, cnt] = mergeSortAndCount(arr);
  return cnt;
};

// console.log(insertionSortCount([2, 1, 3, 1, 2]));
// console.log(insertionSortCount([12, 15, 1, 5, 6, 14, 11]));

const activityNotifications = (expenditure: number[], d: number): number => {
  // 앞 d일 평균 2배 이상이상 출금이면 노티

  const findMedianFn = () => {
    let mid = Math.floor(d / 2) + 1;

    if (d % 2 === 1)
      return () => {
        let acc = 0;
        for (let i = 0; i <= 200; i++) {
          acc += counts[i];
          if (mid <= acc) return i;
        }
      };

    return () => {
      let acc = 0;
      let [mid1, mid2] = [mid - 1, mid];
      let [m1, m2] = [-1, -1];

      for (let i = 0; i <= 200; i++) {
        acc += counts[i];
        if (m1 === -1 && mid1 <= acc) m1 = i;
        if (mid2 <= acc) {
          m2 = i;
          return (m1 + m2) / 2;
        }
      }
    };
  };

  const counts: number[] = new Array(201).fill(0);

  for (let i = 0; i < d; i++) {
    const idx = expenditure[i];
    counts[idx] = counts[idx] + 1;
  }

  let result = 0;
  const findMedian = findMedianFn();

  for (let i = d; i < expenditure.length; i++) {
    const current = expenditure[i];
    const midian = findMedian()!;

    if (midian * 2 <= current) result++;
    counts[expenditure[i - d]]--;
    counts[expenditure[i]]++;
  }

  return result;
};

// console.log(activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5));

const runningTime = (arr: number[]): number => {
  let result = 0;

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;

    while (0 <= j && current < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
      result++;
    }
    arr[j + 1] = current;
  }
  return result;
};

// console.log(runningTime([2, 1, 3, 1, 2]));
// console.log(runningTime([3, 2, 1, 1, 2]));

const countSwap = (arr: number[]): number => {
  const getMinSwaps = (sortedArr: number[]) => {
    const copy = arr.slice();
    const indexMap = new Map<number, number>();

    copy.forEach((v, i) => indexMap.set(v, i));

    let swapCount = 0;
    for (let i = 0; i < arr.length; i++) {
      const currentValue = copy[i];
      const sortValue = sortedArr[i];

      if (currentValue !== sortValue) {
        swapCount++;

        // 정렬된 값의 인덱스
        const toSwapIdx = indexMap.get(sortValue)!;
        // 값 스왑
        [copy[i], copy[toSwapIdx]] = [copy[toSwapIdx], copy[i]];

        indexMap.set(sortValue, i);
        indexMap.set(currentValue, toSwapIdx);
      }
    }

    return swapCount;
  };

  const sortedAsc = [...arr].sort((a, b) => a - b);
  const sortedDesc = [...arr].sort((a, b) => b - a);

  return Math.min(getMinSwaps(sortedAsc), getMinSwaps(sortedDesc));
};
