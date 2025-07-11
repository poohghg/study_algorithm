export default {};

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
console.log(insertionSortCount([12, 15, 1, 5, 6, 14, 11]));
