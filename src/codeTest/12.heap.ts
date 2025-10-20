import PriorityQueue from '../dataStructure/PriorityQueue';

export default {};

class PQ {
  constructor(private compare: (a: number, b: number) => boolean) {}

  private _data: number[] = [];

  get data() {
    return this._data.slice();
  }

  get size() {
    return this._data.length;
  }

  get peak() {
    if (this.size === 0) return undefined;
    return this._data[0];
  }

  push(v: number) {
    this._data.push(v);
    this.bubbleUp();
  }

  pop(): number | undefined {
    if (this._data.length === 1) return this._data.pop();
    this.swap(0, this.size - 1);
    const top = this._data.pop();
    this.bubbleDown();
    return top;
  }

  private bubbleUp() {
    let idx = this.size - 1;

    while (0 < idx) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.compare(this._data[idx], this._data[parentIdx])) {
        this.swap(idx, parentIdx);
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  private bubbleDown() {
    let idx = 0;
    const size = this.size;

    while (idx < size) {
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;
      let currentIdx = idx;

      if (
        leftIdx < size &&
        this.compare(this._data[leftIdx], this._data[currentIdx])
      ) {
        currentIdx = leftIdx;
      }

      if (
        rightIdx < size &&
        this.compare(this._data[rightIdx], this._data[currentIdx])
      ) {
        currentIdx = rightIdx;
      }

      if (currentIdx === idx) break;
      this.swap(idx, currentIdx);
      idx = currentIdx;
    }
  }

  private swap(aIdx: number, bIdx: number) {
    [this._data[aIdx], this._data[bIdx]] = [this._data[bIdx], this._data[aIdx]];
  }
}

function findMinimumPlansForBandwidth(
  planSizes: number[],
  targetBandwidth: number,
): number {
  const miniHeap = new PriorityQueue<[number, number]>((a, b) => a[1] < b[1]);

  for (const planSize of planSizes) {
    if (planSize === targetBandwidth) return 1;
    miniHeap.push([planSize, 1]);
  }

  while (miniHeap.size) {
    const [currentPlanSize, currentCount] = miniHeap.pop()!;

    for (const planSize of planSizes) {
      const nextPlanSize = planSize + currentPlanSize;
      if (nextPlanSize === targetBandwidth) return currentCount + 1;
      if (targetBandwidth < nextPlanSize) continue;
      miniHeap.push([nextPlanSize, currentCount + 1]);
    }
  }

  return -1;
}

console.log(findMinimumPlansForBandwidth([5], 5));

const solution = (scoville: number[], K: number) => {
  const miniHeap = new PQ((a, b) => a < b);
  scoville.forEach((v) => miniHeap.push(v));

  let result = 0;

  while (miniHeap.size && miniHeap.peak! < K) {
    const top1 = miniHeap.pop();
    const top2 = miniHeap.pop();
    if (!top1 || !top2) {
      return -1;
    }

    const mix = top1 + top2 * 2;
    miniHeap.push(mix);
    result++;
  }

  return result;
};

// console.log(solution([1, 2, 3, 9, 10, 12], 7));
// console.log(solution([1, 1], 7));

//https://school.programmers.co.kr/learn/courses/30/lessons/42628
const solution2 = (operations: string[]) => {
  const minHeap = new PQ((a, b) => a < b);
  const maxHeap = new PQ((a, b) => a > b);

  const popHeapData = (heap: PQ) => {
    let top = heap.pop();
    // dataMap에 없다는건 이미 처리된 데이터이다.
    while (top && !dataMap.has(top)) {
      top = minHeap.pop();
    }

    if (top && dataMap.has(top)) {
      if (dataMap.get(top) === 1) {
        dataMap.delete(top);
      } else {
        dataMap.set(top, dataMap.get(top)! - 1);
      }
    }
  };

  // 오퍼레이터 수행후에는 최소값과 최대값을 구해야한다.
  const dataMap = new Map<number, number>();
  for (const operation of operations) {
    let [op, n] = operation.split(' ');
    const num = Number(n);
    if (op === 'I') {
      minHeap.push(num);
      maxHeap.push(num);
      dataMap.set(num, (dataMap.get(num) ?? 0) + 1);
    } else if (num === -1) {
      popHeapData(minHeap);
    } else if (num === 1) {
      popHeapData(maxHeap);
    }
  }

  let max = maxHeap.pop();
  while (max && !dataMap.has(max)) {
    max = maxHeap.pop();
  }

  let min = minHeap.pop();
  while (min && !dataMap.has(min)) {
    min = minHeap.pop();
  }

  return [max ?? 0, min ?? 0];
};

// console.log(
//   solution2(['I 16', 'I -5643', 'D -1', 'D 1', 'D 1', 'I 123', 'D -1']),
// );
//
// console.log(
//   solution2([
//     'I -45',
//     'I 653',
//     'D 1',
//     'I -642',
//     'I 45',
//     'I 97',
//     'D 1',
//     'D -1',
//     'I 333',
//   ]),
// );
