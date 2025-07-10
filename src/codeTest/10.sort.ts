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
      const currentH = land[x][y];

      if (visited[x][y] === 0) {
        visited[x][y] = 1;
        result += cost;
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

console.log(
  moveLand(
    [
      [10, 11, 10, 11],
      [2, 21, 20, 10],
      [1, 20, 21, 11],
      [2, 1, 2, 1],
    ],
    1,
  ),
);
