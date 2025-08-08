export default {};

export class PQ {
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
