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
    if (!(node instanceof Node) && node !== null)
      throw Error('parma is not node');
    this.#next = node;
  }

  get prev() {
    return this.#prev;
  }

  set prev(node) {
    if (!(node instanceof Node) && node !== null)
      throw Error('parma is not node');
    this.#prev = node;
  }

  log(s) {
    console.log(s, 'val:', this.val, '/prev:', this.prev, '/next:', this.next);
  }
}

class DoublyLinkedList {
  #head = null;
  #tail = null;
  #length = 0;

  // 리스트의 맨뒤에 요소를 추가한다.
  push(val) {
    if (val !== 0 && !val) throw Error('There is no value.');
    const newNode = new Node(val);
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
  // 리스트의 맨 뒤의 요소를 제거하고 반환한다.
  pop() {
    if (!this.#head) return undefined;
    const popNode = this.#tail;
    if (this.#length === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = popNode.prev;
      this.#tail.next = null;
      // 리턴 노드의 연결된 정보를 삭제한다.
      popNode.prev = null;
    }
    this.#length--;
    return popNode;
  }
  // 리스트의 맨앞의 요소를 제거하고 반환한다.
  shift() {
    if (!this.#head) return undefined;
    const shiftNode = this.#head;
    if (this.#length === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = shiftNode.next;
      this.#head.prev = null;
      // 리턴 노드의 연결된 정보를 삭제한다.
      shiftNode.next = null;
    }
    this.#length--;
    return shiftNode;
  }
  // 리스트의 맨앞의 요소애 노드를 추가한다.
  unshift(val) {
    if (val !== 0 && !val) throw Error('There is no value.');
    if (!this.#head) return !!this.push(val);
    const newNode = new Node(val);
    newNode.next = this.#head;
    this.#head.prev = newNode;
    this.#head = newNode;
    this.#length++;
    return true;
  }
  // 리스트의 해당 인덱스의 값을 가졍온다.
  get(index) {
    if (index !== 0 && !index) return null;
    if (index < 0 || index >= this.#length) return null;
    // 1 2 3 4 5
    let cnt;
    let node;
    if (index > this.#length / 2) {
      console.log('up');
      cnt = this.#length - 1 - index;
      node = this.#tail;
      for (let i = 0; i < cnt; i++) {
        node = node.prev;
      }
    } else {
      console.log('down');
      cnt = index;
      node = this.#head;
      for (let i = 0; i < cnt; i++) {
        node = node.next;
      }
    }
    return node;
  }

  toString() {
    //developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
    // 모든 객체에는 객체가 텍스트 값으로 표시되거나 객체가 문자열이 예상되는 방식으로 참조 될 때 자동으로 호출되는 toString() 메서드가 있습니다.
    if (this.#length) {
      this.#head.log('headInfo');
      this.#tail.log('tailInfo');
    }
    console.log('length:', this.#length);
  }

  printVal() {
    let array = [];
    let curNode = this.#head;
    while (curNode) {
      array.push(curNode.val);
      curNode = curNode.next;
    }
    console.log(array);
    return array;
  }
}

const list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
// list.printVal();
// list.push(3);
console.log(list.get(0));
// list.toString();
