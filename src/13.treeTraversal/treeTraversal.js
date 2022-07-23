class Node {
  left = null;
  rigth = null;
  count = 0;
  constructor(val) {
    this.val = val;
  }
}
// 바이너러 서치 트리는 검색과 삽입시 로그시간이다.
class BST {
  root = null;

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let currnet = this.root;
    while (true) {
      if (val < currnet.val) {
        if (!currnet.left) {
          currnet.left = newNode;
          return this;
        }
        currnet = currnet.left;
      } else if (val > currnet.val) {
        if (!currnet.rigth) {
          currnet.rigth = newNode;
          return this;
        }
        currnet = currnet.rigth;
      } else {
        currnet.count++;
        return this;
      }
    }
  }

  find(val) {
    if (!this.root) return null;
    let current = this.root;
    while (current) {
      if (current.val === val) return true;
      else if (val < current.val) current = current.left;
      else current = current.rigth;
    }
    return false;
  }
  // 넓이 우선탐색
  BFS() {
    // 큐를 사용해 방문해야할곳의 목록을 저정하여 사용한다.
    if (!this.root) return [];
    let data = [],
      queue = [],
      node;
    queue.push(this.root);
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.rigth) queue.push(node.rigth);
    }
    return data;
  }
}

const tree = new BST();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
console.log(tree.BFS());
