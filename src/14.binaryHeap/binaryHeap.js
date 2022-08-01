class MaxBinaryHeap {
  #value = [];
  name = '12345';
  get value() {
    return this.#value;
  }

  swap(i, j) {
    const temp = this.#value[i];
    this.#value[i] = this.#value[j];
    this.#value[j] = temp;
  }
  /**
   * 배열의 맨끝에 새로운 요소를 추가한다
   * 버블업을 통해 추가된 요소를 알맞은 자리에 배치한다
   * 자식의 값은 부모의 값보다 클수 없다.
   */
  insert(v) {
    if (!v && v !== 0) return;
    this.#value.push(v);
    let index = this.#value.length - 1;
    while (index) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.#value[parentIndex] > v) return;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  /**
   * 최대값추출또는 제거
   * 배열의 마지막값을 루트로 올린후 버블다운을 한다.
   * 버블다운: 부모노드와 자식노드를 비교하여 루트로 끌어올린 마지막노들를 알맞은 위치에 노드를 위치시킨다.
   */
  remove() {
    if (!this.#value.length) return false;
    const lastNode = this.value.pop();
    if (!this.#value.length) return lastNode;
    const max = this.#value[0];
    this.#value[0] = lastNode;
    let index = 0;
    let swapIndex;

    const calSwapInfo = () => {
      const nodeLeftIndex = Math.floor(index * 2 + 1);
      const nodeRightIndex = Math.floor(index * 2 + 2);
      if (this.#value[nodeLeftIndex] > this.#value[nodeRightIndex] ?? 0)
        swapIndex = nodeLeftIndex;
      else swapIndex = nodeRightIndex;
    };

    while (true) {
      calSwapInfo();
      // 배열의 길이를 넘어가면 멈춤
      if (swapIndex > this.#value.length - 1) break;
      if (this.#value[index] > this.#value[swapIndex]) break;
      this.swap(swapIndex, index);
      index = swapIndex;
    }
    return max;
  }
}

const maxBinaryHeap = new MaxBinaryHeap();
maxBinaryHeap.insert(5);
maxBinaryHeap.insert(10);
// maxBinaryHeap.insert(15);
// maxBinaryHeap.insert(100);
// maxBinaryHeap.insert(105);
// maxBinaryHeap.insert(20);
// maxBinaryHeap.insert(1);
// maxBinaryHeap.insert(1000);
console.log(maxBinaryHeap.value);
maxBinaryHeap.remove();
maxBinaryHeap.remove();
// maxBinaryHeap.remove();
console.log(maxBinaryHeap.value);
