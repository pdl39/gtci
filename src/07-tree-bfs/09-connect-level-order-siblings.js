/* Given a binary tree, connect each node with its level order successor. The last node of each level should point to a null node. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

class TreeV2 extends Tree {
  constructor(value) {
    super(value);
    this.next = null;
  }

  printLevelOrder() {
    let current = this;
    let nextLevelRoot = null;
    const levelOrderTree = [];

    while (current) {
      levelOrderTree.push(current.value);

      if (!nextLevelRoot) {
        if (current.left) nextLevelRoot = current.left;
        else if (current.right) nextLevelRoot = current.right;
      }

      if (!current.next) {
        if (!nextLevelRoot) {
          return levelOrderTree;
        }
        else {
          current = nextLevelRoot;
          nextLevelRoot = null;
        }
      }
      else {
        current = current.next;
      }
    }

    return null;
  }
}

// T: O(n) --> traverse each tree node once.
// S: O(n) --> n for the queue.
// where n = # of nodes in the tree.

const connectLevelOrderSiblings = (root) => {
  if (!root) return null;

  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;
      // keep track of the successor (next) for each node. If next node exists in the queue and the current node is not the last node in the current level, the next node will be the next node in the queue. Otherwise, it is null.
      const next = queue.peek() && i < levelSize - 1 ? queue.peek().value : null;

      current.next = next;

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }
  }
}


// TEST
const tree1 = new TreeV2(5);
tree1.left = new TreeV2(8);
tree1.right = new TreeV2(9);
tree1.left.left = new TreeV2(3);
tree1.left.right = new TreeV2(4);
tree1.right.left = new TreeV2(11);
tree1.right.right = new TreeV2(13);
tree1.left.left.left = new TreeV2(20);
tree1.left.left.right = new TreeV2(21);
tree1.left.right.left = new TreeV2(22);
tree1.left.right.right = new TreeV2(24);
tree1.right.left.left = new TreeV2(25);
tree1.right.right.right = new TreeV2(27);

const tree2 = new TreeV2(12);
tree2.left = new TreeV2(7);
tree2.right = new TreeV2(1);
tree2.left.left = new TreeV2(9);
tree2.left.right = new TreeV2(2);
tree2.right.left = new TreeV2(10);
tree2.right.right = new TreeV2(5);

const tree3 = new TreeV2(12);
tree3.left = new TreeV2(7);
tree3.right = new TreeV2(1);
tree3.right.left = new TreeV2(10);
tree3.right.right = new TreeV2(5);
tree3.right.left.left = new TreeV2(17);
tree3.right.right.right = new TreeV2(21);

const tree4 = null;

connectLevelOrderSiblings(tree1);
console.log(tree1.printLevelOrder());
connectLevelOrderSiblings(tree2);
console.log(tree2.printLevelOrder());
connectLevelOrderSiblings(tree3);
console.log(tree3.printLevelOrder());
connectLevelOrderSiblings(tree4);
console.log(tree4?.printLevelOrder());
