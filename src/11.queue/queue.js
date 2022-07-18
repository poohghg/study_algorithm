// 배열로 스택을 만들기
const queueInArray = () => {
  // 큐는 선입선출이다.
  const q = [];
  //  js의 내장메서드인 push와 pop만 사용한다면 스택처럼 배열을 관리 할 수 있다.
  q.unshift(1);
  q.unshift(2);
  q.unshift(3);
  console.log(q);
  console.log(q.pop());
  console.log(q);
  return undefined;
  // shift 와 unshift를 사용해서 배열의 index를 재정렬하는것은 좋지 않다.
};
// queueInArray();
const queueInLinkedList = () => {
  // 링크드리스로 이루어진 큐는 삽입과 삭제시 시간복잡도에서 상수시간을 가진다.
  // 검색와 인덱스 접근시에는 선형시간
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

  // 선입선출
  class queue {
    #first = null;
    #last = null;
    #size = 0;

    // first에 새로운 데이터를 추가한다.
    enqueue(val) {
      const newNode = new Node(val);
      if (!this.#first) {
        this.#first = newNode;
        this.#last = newNode;
      } else {
        this.#last.next = newNode;
        this.#last = newNode;
      }
      this.#size++;
    }

    dnqueue() {
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
  const q = new queue();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  console.log(q.dnqueue());
  console.log(q.dnqueue());
  console.log(q.dnqueue());
  console.log(q.toString());
};
queueInLinkedList();
