class Node {
  #next = null;
  #prev = null;
  constructor(val) {
    this.val = val;
  }

  get next() {
    return this.#next;
  }

  set next(node) {
    if (!(node instanceof Node)) throw Error('parma is not node');
    this.#next = node;
  }

  get prev() {
    return this.#prev;
  }

  set prev(node) {
    if (!(node instanceof Node)) throw Error('parma is not node');
    this.#prev = node;
  }

  log(s) {
    console.log(s, 'val:', this.val, '/next:', this.next, '/prev:', this.prev);
  }
}

class DoublyLinkedList {
  #head = null;
  #tail = null;
  #length = 0;

  push(v) {
    const newNode = new Node(v);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      newNode.prev = this.#tail;
      this.#tail = newNode;
    }
    this.#length++;
  }

  toString() {
    //developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
    // 모든 객체에는 객체가 텍스트 값으로 표시되거나 객체가 문자열이 예상되는 방식으로 참조 될 때 자동으로 호출되는 toString() 메서드가 있습니다.
    this.#head.log('headInfo');
    this.#tail.log('tailInfo');
    console.log('length:', this.#length);
  }
}

const list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.toString();
