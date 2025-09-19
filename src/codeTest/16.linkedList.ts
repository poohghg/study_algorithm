export default {};

class SinglyLinkedListNode {
  data: number;
  next: SinglyLinkedListNode | null;

  constructor(nodeData: number) {
    this.data = nodeData;
    this.next = null;
  }
}

function deleteDuplicates(head: SinglyLinkedListNode): SinglyLinkedListNode {
  let currentNode: SinglyLinkedListNode | null = head?.next;

  while (currentNode && currentNode.next) {
    if (currentNode.data === currentNode.next.data) {
      currentNode.next = currentNode.next.next;
    } else {
      currentNode = currentNode.next;
    }
  }

  return head;
}
