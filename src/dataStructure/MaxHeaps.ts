class MaxHeaps<T> {
  private readonly _data: T[] = [];

  constructor(init: T | T[] = []) {
    if (Array.isArray(init)) {
      this._data = init;
      this._data.sort((a, b) => (a > b ? -1 : 1)); // MaxHeap은 큰 값이 앞에 오도록 정렬
    } else {
      this._data.push(init);
    }
  }

  get data() {
    return [...this._data];
  }

  get size() {
    return this._data.length;
  }

  push(value: T) {
    this._data.push(value);
    this.bubbleUp();
  }

  extract(): T | undefined {
    if (this.size === 0) return undefined;
    if (this.size === 1) return this._data.pop();

    this.swapValue(this.size - 1, 0);
    const max = this._data.pop();
    this.bubbleDown();
    return max;
  }

  private bubbleUp() {
    let index = this.size - 1;
    const value = this._data[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (value > this._data[parentIndex]) {
        this.swapValue(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown() {
    let index = 0;

    while (index < this.size) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let currentMaxIndex = index;

      if (this.data[leftIndex] > this.data[currentMaxIndex]) {
        currentMaxIndex = leftIndex;
      }

      if (this.data[rightIndex] > this.data[currentMaxIndex]) {
        currentMaxIndex = rightIndex;
      }

      if (currentMaxIndex === index) break;

      this.swapValue(index, currentMaxIndex);
      index = currentMaxIndex;
    }
  }

  private swapValue(targetIndex: number, parentIndex: number) {
    [this._data[parentIndex], this._data[targetIndex]] = [
      this._data[targetIndex],
      this._data[parentIndex],
    ];
  }
}

const heap = new MaxHeaps([3, 1, 2, 5]);
heap.push(100);
heap.push(103);
heap.push(104);
heap.push(101);
heap.push(99);
console.log(heap.data);
console.log(heap.extract());
console.log(heap.extract());
console.log(heap.extract());
console.log(heap.data);
