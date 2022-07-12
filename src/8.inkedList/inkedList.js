/**
 * 데이터 -val
 * 다음 포인터의 정보 -next
 */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  printVal() {
    const list = [];
    let curNode = this.head;
    while (curNode) {
      list.push(curNode.val);
      curNode = curNode.next;
    }
    return list;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  // 리스트의 마지막요소를 반환하고 테일을 테일의 이전노드로 변경한다.
  pop() {
    if (!this.head) return undefined;
    let curNode = this.head;
    let newTail = curNode;
    // 루프를 이끄는 변수 curNode
    while (curNode.next) {
      newTail = curNode;
      curNode = curNode.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
      this.head = null;
    }
    return curNode.val;
  }
  // 리스트의 맨앞의 요소를 반환한다.
  shift() {
    if (!this.head) return undefined;
    const returnNode = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) this.tail = null;
    return returnNode;
  }
  // 새로운 요소를 받아, 리스트의 맨 앞에 추가한다.
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  // 해당인덱스를 찾아 요소를 반환한다.
  get(index) {
    if (index >= this.length || index < 0) return undefined;
    let curNode = this.head;
    let cnt = 0;
    while (true) {
      if (cnt === index) break;
      curNode = curNode.next;
      cnt++;
    }
    return curNode;
  }
  // index 와 val 를 받아 해당위치에 val값을 업데이트 한다.
  set(index, val) {
    const fNode = this.get(index);
    if (!fNode) return false;
    fNode.val = val;
    return true;
  }
  // 해당인덱스에 새로운 노드를 삽압힌다.
  insert(index, val) {
    if (index < 0 || index >= this.length) return false;
    else if (index === 0) return !!this.unshift(val);
    else if (index === this.length - 1) return !!this.push(val);

    const newNode = new Node(val);
    const prevNode = this.get(index - 1);
    const preNodeNextNode = prevNode.next;

    prevNode.next = newNode;
    newNode.next = preNodeNextNode;
    this.length++;
    return true;
  }
  // 해당인덱스 요소를 삭제한다.
  remove(index) {
    if (index < 0 || index > this.length) return false;
    else if (index === 0) return !!this.shift();
    else if (index === this.length - 1) return !!this.pop();

    const preNode = this.get(index - 1);
    preNode.next = preNode.next.next;
    this.length--;
  }
  //
  reverse() {
    // 1 -> 2 -> 3 -> 4
    // 1 <- 2 <- 3 <- 4
    // swap head and tail
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let prev = null;
    let next;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    console.log(this);
  }
}

let List = new LinkedList();

List.push(1);
List.push(2);
List.push(3);
List.push(4);
// List.push(4);
// console.log(List.get(0));
// console.log(List.get());
console.log(List.printVal());
console.log(List.reverse());
// console.log(List.get(1));
// console.log(List.pop());
// console.log(List.pop());
// List.shift();
