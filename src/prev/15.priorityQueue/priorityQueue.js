class Node {
  // #val;
  // #priority;
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }

  // get Info() {
  //   return { val: this.#val, priority: this.#priority };
  // }
}

class PriorityQueue {
  #value = [];
  get value() {
    return this.#value;
  }

  swap(i, j) {
    const temp = this.#value[i];
    this.#value[i] = this.#value[j];
    this.#value[j] = temp;
  }

  enqueue(val, priority) {
    if (!val && val !== 0) throw Error('val is not undefined');
    if (isNaN(priority)) throw Error('priority is NaN');

    const newNode = new Node(val, priority);
    this.#value.push(newNode);
    let index = this.#value.length - 1;
    let parentIdx, parentNode;
    // 버블업
    while (index) {
      parentIdx = Math.floor((index - 1) / 2);
      parentNode = this.#value[parentIdx];
      if (parentIdx < 0) break;
      if (priority > parentNode.priority) break;
      this.swap(index, parentIdx);
      index = parentIdx;
    }
    return true;
  }

  dequeue() {
    if (!this.#value.length) return;
    const top = this.#value[0];
    const end = this.#value.pop();
    if (this.#value.length) {
      this.#value[0] = end;
      this.sinkDown();
    }
    return top;
  }

  sinkDown() {
    let idx = 0;
    let swapIdx;

    while (true) {
      let leftNodeIdx = idx * 2 + 1;
      let rightNodeIdx = idx * 2 + 2;

      if (
        this.#value[leftNodeIdx]?.priority > this.#value[rightNodeIdx]?.priority
      )
        swapIdx = rightNodeIdx;
      else swapIdx = leftNodeIdx;

      if (swapIdx >= this.#value.length) break;
      if (this.#value[swapIdx].priority > this.#value[idx].priority) break;
      this.swap(idx, swapIdx);
      idx = swapIdx;
    }
  }

  // dequeue() {
  //   const min = this.values[0];
  //   const end = this.values.pop();
  //   if (this.values.length > 0) {
  //     this.values[0] = end;
  //     this.sinkDown();
  //   }
  //   return min;
  // }
  // sinkDown() {
  //   let idx = 0;
  //   const length = this.values.length;
  //   const element = this.values[0];
  //   while (true) {
  //     let leftChildIdx = 2 * idx + 1;
  //     let rightChildIdx = 2 * idx + 2;
  //     let leftChild, rightChild;
  //     let swap = null;

  //     if (leftChildIdx < length) {
  //       leftChild = this.values[leftChildIdx];
  //       if (leftChild.priority < element.priority) {
  //         swap = leftChildIdx;
  //       }
  //     }
  //     if (rightChildIdx < length) {
  //       rightChild = this.values[rightChildIdx];
  //       if (
  //         (swap === null && rightChild.priority < element.priority) ||
  //         (swap !== null && rightChild.priority < leftChild.priority)
  //       ) {
  //         swap = rightChildIdx;
  //       }
  //     }
  //     if (swap === null) break;
  //     this.values[idx] = this.values[swap];
  //     this.values[swap] = element;
  //     idx = swap;
  //   }
  // }
}

const priorityQ = new PriorityQueue();
// priorityQ.enqueue(1, 100);
// priorityQ.enqueue(1, 50);
// priorityQ.enqueue(1, 1);
// priorityQ.enqueue(1, 30);
priorityQ.enqueue(1, 2);
priorityQ.enqueue(1, 3);
priorityQ.enqueue(1, 2);
priorityQ.enqueue(1, 0);
// priorityQ.dequeue();
// priorityQ.dequeue();
// priorityQ.dequeue();
// priorityQ.dequeue();
console.log(priorityQ.value);
