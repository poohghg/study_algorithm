class Node {
  left = null;
  rigth = null;
  count = 0;
  constructor(val) {
    this.val = val;
  }
}

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
    // let parent = this.root;
    // let curNode = this.root;
    // while (curNode) {
    //   parent = curNode;
    //   if (val > curNode.val) curNode = curNode.rigth;
    //   else curNode = curNode.left;
    // }

    // if (val > parent.val) parent.rigth = newNode;
    // else parent.left = newNode;
    // return this;
  }

  find(val) {
    if (!this.root) return null;
    let current = this.root;
    while (current) {
      if (current.val === val) return true;
      if (val < current.val) current = current.left;
      else current = current.rigth;
    }
    return false;
  }
}

const tree = new BST();
tree.insert(5);
// tree.insert(8);
// tree.insert(10);
// tree.insert(12);
// tree.insert(15);
// tree.insert(11);
// tree.insert(1);
// tree.insert(3);
// tree.insert(4);

// console.log(tree.root.rigth.rigth.rigth);
console.log(tree.find(55));
