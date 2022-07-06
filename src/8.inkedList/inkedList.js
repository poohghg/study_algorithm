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
    while (newTail.next) {
      newTail = curNode;
      curNode = newTail.next;
    }
    this.tail = preNode;
    this.tail.next = null;
    this.length--;
    return returnVal;
  }
}

let List = new LinkedList();

List.push(1);
console.log(List.pop());
