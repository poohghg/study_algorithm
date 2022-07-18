// 배열로 스택을 만들기
const stackInArray = () => {
  const stack = [];
  //  js의 내장메서드인 push와 pop만 사용한다면 스택처럼 배열을 관리 할 수 있다.
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log(stack.pop());
  console.log(stack);
  return undefined;
  // shift 와 unshift를 사용해서 배열의 index를 재정렬하는것은 좋지 않다.
};
// stackInArray();
const stackInLinkedList = () => {
  class Node {
    #next = null;
    constructor(val) {
      this.val = val;
    }
    get next() {
      return this.#next;
    }
    set next(node) {
      if (!(node instanceof Node) && node != null)
        throw Error('parma is not node');
      this.#next = node;
    }
    toString() {
      return {
        val: this.val,
        next: this.#next,
      };
    }
  }

  class Stack {
    #first = null;
    #last = null;
    #size = 0;

    // first에 새로운 데이터를 추가한다.
    push(val) {
      const newNode = new Node(val);
      if (!this.#first) {
        this.#first = newNode;
        this.#last = newNode;
      } else {
        newNode.next = this.#first;
        this.#first = newNode;
      }
      this.#size++;
    }

    pop() {
      if (this.#size === 0) return null;
      const popNode = this.#first;
      if (this.#size === 1) this.#last = null;
      this.#first = this.#first.next;
      this.#size--;
      return popNode.val;
    }

    toString() {
      console.log({
        first: this.#first?.toString(),
        last: this.#last?.toString(),
        size: this.#size,
      });
    }
  }
  const stack = new Stack();
  stack.push(1);
  stack.push(2);
  console.log(stack.pop());
  console.log(stack.pop());
  // stack.pop();
  // stack.push(3);
  stack.toString();
  // const f = stack.

  // console.log(stack.toString());
};
stackInLinkedList();
