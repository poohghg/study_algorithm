class MaxBinaryHeap {
  #value = [];
  name = '12345';
  get value() {
    return this.#value;
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
    const swap = (i, j) => {
      const temp = this.#value[i];
      this.#value[i] = this.#value[j];
      this.#value[j] = temp;
      return true;
    };

    while (index) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (v > this.#value[parentIndex]) {
        swap(index, parentIndex);
        index = parentIndex;
      } else return;
    }
  }

  /**
   * 최대값추출또는 제거
   * 배열의 마지막값을 루트로 올린후 버블다운을 한다.
   */
  remove() {
    if (!this.#value.length) return false;
    const v = this.#value[0];
    const lastNode = this.#value[this.#value.length - 1];
    this.#value[0] = lastNode;
    // let root = this.#value[0];
    let index = 0;
    let swapIndex;
    const calSwapInfo = (idx) => {
      const nodeLeftIndex = Math.floor(index * 2 + 1);
      const nodeRightIndex = Math.floor(index * 2 + 2);
      if (this.#value[nodeLeftIndex] > this.#value[nodeRightIndex])
        swapIndex = nodeLeftIndex;
      else swapIndex = nodeRightIndex;
    };
    while (true) {
      calSwapInfo();
      if (swapIndex > this.#value.length - 1) break;
      if (this.#value[swapIndex] < this.#value[index]) break;
      const temp = this.#value[index];
      this.#value[index] = this.#value[swapIndex];
      this.#value[swapIndex] = temp;
      index = swapIndex;
    }
    return v;
  }
}

const maxBinaryHeap = new MaxBinaryHeap();
maxBinaryHeap.insert(5);
maxBinaryHeap.insert(10);
maxBinaryHeap.insert(15);
maxBinaryHeap.insert(100);
maxBinaryHeap.insert(105);
maxBinaryHeap.insert(20);
console.log(maxBinaryHeap.value);
maxBinaryHeap.remove();
console.log(maxBinaryHeap.value);