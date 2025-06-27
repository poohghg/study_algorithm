class MaxHeaps<T> {
  data: T[] = [];

  constructor(init: T | T[] = []) {
    if (Array.isArray(init)) {
      this.data = init;
      this.data.sort((a, b) => (a > b ? -1 : 1)); // MaxHeap은 큰 값이 앞에 오도록 정렬
    } else {
      this.data.push(init);
    }
  }

  get size() {
    return this.data.length;
  }

  push(value: T) {
    this.data.push(value);
    this.bubbleUp();
  }

  private bubbleUp() {
    let index = this.size - 1;
    const value = this.data[index];

    while (true) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (value > this.data[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private swap(targetIndex: number, parentIndex: number) {
    [this.data[parentIndex], this.data[targetIndex]] = [
      this.data[targetIndex],
      this.data[parentIndex],
    ];
  }
}

const heap = new MaxHeaps([3, 1, 2, 5]);
console.log(heap.data);
heap.push(100);
heap.push(103);
heap.push(104);
heap.push(101);
heap.push(99);
console.log(heap.data);
