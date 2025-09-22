export default {};

class SinglyLinkedListNode {
  data: number;
  next: SinglyLinkedListNode | null;

  constructor(nodeData: number) {
    this.data = nodeData;
    this.next = null;
  }
}

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
