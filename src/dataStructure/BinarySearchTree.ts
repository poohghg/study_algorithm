import { Node } from './Node';

class BinarySearchTree<T = number> {
  constructor(data?: T[] | T) {
    if (!data) return;

    if (Array.isArray(data)) {
      data.forEach((d) => this.insert(d));
    } else {
      this.insert(data);
    }
  }

  private _root: Node<T> | null = null;

  get root() {
    return this._root;
  }

  insert(value: T): Node<T> {
    if (!this._root) {
      this._root = new Node(value);
      return this._root;
    }

    let currentNode: Node<T> = this._root;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          const newNode = new Node(value);
          currentNode.left = newNode;
          return newNode;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          const newNode = new Node(value);
          currentNode.right = newNode;
          return newNode;
        }
        currentNode = currentNode.right;
      }
    }
  }

  //      15
  //    10
  //  9    14
  // 8    12
  //7       13

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

  remove1(value: T) {
    if (!this.root) return;
    this._root = this.removeTraverse(this._root, value);
  }

  preOrder() {
    const data: T[] = [];
    const preorderLoop = (node: Node<T> | null) => {
      if (!node) return;
      data.push(node.value);
      preorderLoop(node.left);
      preorderLoop(node.right);
    };
    preorderLoop(this.root);
    return data;
  }

  inOrder() {
    const data: T[] = [];
    const inOrderLoop = (node: Node<T> | null) => {
      if (!node) return;
      inOrderLoop(node.left);
      data.push(node.value);
      inOrderLoop(node.right);
    };

    inOrderLoop(this.root);
    return data;
  }

  buildFromPreOrder(arr: T[]): BinarySearchTree<T> {
    const newBst = new BinarySearchTree<T>();
    let index = 0;
    const buildLoop = (min: T, max: T): Node<T> | null => {
      if (index >= arr.length) return null;
      const value = arr[index];
      if (value < min || value > max) return null;

      index++;
      const node = newBst.insert(value);

      node.left = buildLoop(min, value);
      node.right = buildLoop(value, max);

      return node;
    };

    return newBst;
  }

  // Binary Search Tree: Lowest Common Ancestor
  //  2
  //1 . 3
  lca(v1: T, v2: T) {
    let currentNode = this.root;
    while (currentNode) {
      if (v1 < currentNode.value && v2 < currentNode.value) {
        currentNode = currentNode.left;
      } else if (currentNode.value < v1 && currentNode.value < v2) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return currentNode;
  }

  treeHeight() {
    const loop = (node: Node<T> | null): number => {
      if (!node) return -1;
      return 1 + Math.max(loop(node.left), loop(node.right));
    };

    return loop(this.root);
  }

  private removeTraverse(node: Node<T> | null, target: T): Node<T> | null {
    if (!node) return null;

    if (target < node.value) {
      node.left = this.removeTraverse(node.left, target);
    } else if (node.value < target) {
      node.right = this.removeTraverse(node.right, target);
    }

    if (target === node.value) {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let current: Node<T> = node.right;
      while (current.left) current = current.left;

      node.value = current.value;
      node.right = this.removeTraverse(node.right, current.value);
    }

    return node;
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
bst.insert(6);
bst.insert(15);
bst.insert(14);
bst.insert(3);
bst.insert(1);
bst.insert(2);
bst.insert(0);
/**
 *      10
 *     5  15
 *   3 6  14
 * 1
 *0  2
 */

// ?
console.log(bst.treeHeight());
