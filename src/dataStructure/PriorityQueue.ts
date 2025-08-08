export default class PriorityQueue<T> {
  private heap: T[];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.heap = [];
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  get peak() {
    return this.heap[0];
  }

  push(value: T) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop(): T | undefined {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return min;
  }

  private bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIdx]) >= 0) break;
      [this.heap[index], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[index],
      ];
      index = parentIdx;
    }
  }

  private bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let smallest = index;

      if (
        leftIdx < length &&
        this.compare(this.heap[leftIdx], this.heap[smallest]) < 0
      ) {
        smallest = leftIdx;
      }
      if (
        rightIdx < length &&
        this.compare(this.heap[rightIdx], this.heap[smallest]) < 0
      ) {
        smallest = rightIdx;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}
