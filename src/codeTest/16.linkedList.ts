export default {};

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

//https://leetcode.com/problems/add-two-numbers/
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const getListNodeNum = (l: ListNode | null) => {
    let current: ListNode | null = l;
    const result: number[] = [];

    while (current) {
      result.push(current.val);
      current = current.next;
    }

    return Number(result.reverse().join(''));
  };

  const sum = (getListNodeNum(l1) + getListNodeNum(l2)).toString();

  const head: ListNode = new ListNode(Number(sum[sum.length - 1]));
  let prev: ListNode | null = head;

  for (let i = sum.length - 2; 0 <= i; i--) {
    const newNode = new ListNode(Number(sum[i]));
    prev.next = newNode;
    prev = newNode;
  }

  return head;
}

console.log(addTwoNumbers(null, null));

class SinglyLinkedListNode {
  data: number;
  next: SinglyLinkedListNode | null;

  constructor(nodeData: number) {
    this.data = nodeData;
    this.next = null;
  }
}

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/reverse-even-indexed-nodes/problem?isFullScreen=true
function extractAndAppendSponsoredNodes(
  head: SinglyLinkedListNode,
): SinglyLinkedListNode {
  const print = (node: SinglyLinkedListNode | null) => {
    let currentNode: SinglyLinkedListNode | null = node;
    while (currentNode) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  };

  let evenNumberNodeHead: SinglyLinkedListNode | null = null;
  let evenNumberNodeTail: SinglyLinkedListNode | null = null;
  let oddNumberNodeHead: SinglyLinkedListNode | null = null;
  let oddNumberNodeTail: SinglyLinkedListNode | null = null;

  let currentNode: SinglyLinkedListNode | null = head;
  let index = 0;

  while (currentNode) {
    const nextNode: SinglyLinkedListNode | null = currentNode.next;
    currentNode.next = null;

    if (index % 2 === 0) {
      if (!evenNumberNodeHead) {
        evenNumberNodeHead = currentNode;
      } else {
        evenNumberNodeTail!.next = currentNode;
      }
      evenNumberNodeTail = currentNode;
    } else {
      if (!oddNumberNodeHead) {
        oddNumberNodeHead = currentNode;
      } else {
        oddNumberNodeTail!.next = currentNode;
      }
      oddNumberNodeTail = currentNode;
    }

    currentNode = nextNode;
    index++;
  }

  currentNode = evenNumberNodeHead;
  let prevNode: SinglyLinkedListNode | null = null;
  while (currentNode) {
    const next: SinglyLinkedListNode | null = currentNode.next;
    currentNode.next = prevNode;
    prevNode = currentNode;
    currentNode = next;
  }

  if (oddNumberNodeHead) {
    oddNumberNodeTail!.next = prevNode;
    return oddNumberNodeHead!;
  }
  return head;
}

// 10
// 20
// 30
// 40
// 50
// 60

const head = new SinglyLinkedListNode(10);
head.next = new SinglyLinkedListNode(20);
head.next.next = new SinglyLinkedListNode(30);
head.next.next.next = new SinglyLinkedListNode(40);
head.next.next.next.next = new SinglyLinkedListNode(50);
head.next.next.next.next.next = new SinglyLinkedListNode(60);

// console.log(extractAndAppendSponsoredNodes(head));

const deleteDuplicates = (head: SinglyLinkedListNode): SinglyLinkedListNode => {
  let currentNode: SinglyLinkedListNode | null = head?.next;

  while (currentNode && currentNode.next) {
    if (currentNode.data === currentNode.next.data) {
      currentNode.next = currentNode.next.next;
    } else {
      currentNode = currentNode.next;
    }
  }

  return head;
};

//https://www.hackerrank.com/contests/software-engineer-prep-kit/challenges/one-pass-removal-kth-from-end/problem?isFullScreen=true
const removeKthNodeFromEnd = (head: SinglyLinkedListNode, k: number) => {};
