/**
 * a < b 가 참이면 minHeap
 * a > b 가 참이면 maxHeap
 */

export default class MyPriorityQueue<T = number> {
  constructor(private compare: (a: T, b: T) => boolean) {}

  private _data: T[] = [];

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

  push(v: T) {
    this._data.push(v);
    this.bubbleUp();
  }

  pop(): T | undefined {
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
