/* Given a binary tree, connect each node with its level order successor. The last node of each level should point to the first node of the next level. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

class TreeV3 extends Tree {
  constructor(value) {
    super(value);
    this.next = null;
  }

  // Note, this method is much simpler vs. the printLevelOrder method from TreeV2 in 09-connect-level-order-siblings, as here, each tree node will be connected to a successor tree node until the very last tree node (vs. last tree node of each level being connected to a null node).
  printLevelOrder() {
    let current = this;
    const levelOrderTree = [];

    while (current) {
      levelOrderTree.push(current.value);
      current = current.next;
    }

    return levelOrderTree;
  }
}

// T: O(n) --> traverse each tree node once.
// S: O(n) --> n for the queue.
// where n = # of nodes in the tree.

const connectAllLevelOrderSiblings = (root) => {
  if (!root) return null;

  const queue = new Queue(root);

  while (queue.length) {
    const current = queue.dequeue().value;

    if (current.left) queue.add(current.left);
    if (current.right) queue.add(current.right);

    let next = queue.length ? queue.peek().value : null;
    current.next = next;
  }
}


// TEST
const tree1 = new TreeV3(5);
tree1.left = new TreeV3(8);
tree1.right = new TreeV3(9);
tree1.left.left = new TreeV3(3);
tree1.left.right = new TreeV3(4);
tree1.right.left = new TreeV3(11);
tree1.right.right = new TreeV3(13);
tree1.left.left.left = new TreeV3(20);
tree1.left.left.right = new TreeV3(21);
tree1.left.right.left = new TreeV3(22);
tree1.left.right.right = new TreeV3(24);
tree1.right.left.left = new TreeV3(25);
tree1.right.right.right = new TreeV3(27);

const tree2 = new TreeV3(12);
tree2.left = new TreeV3(7);
tree2.right = new TreeV3(1);
tree2.left.left = new TreeV3(9);
tree2.left.right = new TreeV3(2);
tree2.right.left = new TreeV3(10);
tree2.right.right = new TreeV3(5);

const tree3 = new TreeV3(12);
tree3.left = new TreeV3(7);
tree3.right = new TreeV3(1);
tree3.right.left = new TreeV3(10);
tree3.right.right = new TreeV3(5);
tree3.right.left.left = new TreeV3(17);
tree3.right.right.right = new TreeV3(21);

const tree4 = null;

connectAllLevelOrderSiblings(tree1);
console.log(tree1.printLevelOrder());
connectAllLevelOrderSiblings(tree2);
console.log(tree2.printLevelOrder());
connectAllLevelOrderSiblings(tree3);
console.log(tree3.printLevelOrder());
connectAllLevelOrderSiblings(tree4);
console.log(tree4?.printLevelOrder());
