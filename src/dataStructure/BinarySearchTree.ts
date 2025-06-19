import { Node } from './Node';

class BinarySearchTree<T = any> {
  private _root: Node<T> | null = null;

  get root() {
    return this._root;
  }

  insert(value: T) {
    if (!this._root) {
      this._root = new Node(value);
      return;
    }

    let currentNode: Node<T> = this._root;

    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = new Node(value);
          break;
        }
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        if (!currentNode.right) {
          currentNode.right = new Node(value);
          break;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(value: T) {
    if (!this._root) return undefined;

    let currentNode: Node<T> | null = this._root;

    while (currentNode) {
      if (currentNode.value === value) return currentNode;

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        currentNode = currentNode.right;
      }
    }

    return undefined;
  }

  //      15
  //    10
  //  9    14
  // 8    12
  //7       13
  //
  remove(value: T) {
    const traverse = (node: Node<T> | null, targetValue: T): Node<T> | null => {
      if (!node) return null;

      if (targetValue < node.value) {
        node.left = traverse(node.left, targetValue);
      } else if (node.value < value) {
        node.right = traverse(node.right, targetValue);
      }

      if (node.value === targetValue) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        const largeMinNode = this.findLargeMinNode(node.right);
        // 값을 대체한다.
        node.value = largeMinNode.value;
        // 가장 작은값을 삭제한다.
        node.right = traverse(node.right, largeMinNode.value);
      }

      return node;
    };

    if (!this._root) return;
    this._root = traverse(this._root, value);
  }

  // 가장 작은 원소부터 뽑을때?
  values(): T[] {
    const result: T[] = [];
    const traverse = (node: Node<T> | null) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.value);
      traverse(node.right);
    };
    traverse(this._root);
    return result;
  }

  private findLargeMinNode(node: Node<T>) {
    let currentNode = node;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(14);
bst.insert(3);
bst.insert(1);
bst.insert(2);
bst.insert(0);

// console.log(bst.find(11));
// console.log(bst.find(10));
console.log(bst.root);
bst.remove(10);
console.log('??');
console.log(bst.root);
