/* Given a binary tree, find its maximum depth (or height) */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

// T: O(n) --> traverse each tree node once.
// S: O(n) --> n for the queue.
// where n = # of nodes in the tree.

// This question is very similar to 06-binary-tree-min-depth, except that here, we need to return the max depth, so instead of returning the depth count when we encounter the first leaf node, we increment the depth count at each level until we have looked at the entire tree and return the final depth count.

const binaryTreeMaxDepth = (root) => {
  if (!root) return 0;

  let maxDepth = 0;
  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;
    maxDepth++;

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }
  }

  return maxDepth;
}


// TEST
const tree1 = new Tree(5);
tree1.left = new Tree(8);
tree1.right = new Tree(9);
tree1.left.left = new Tree(3);
tree1.left.right = new Tree(4);
tree1.right.left = new Tree(11);
tree1.right.right = new Tree(13);
tree1.left.left.left = new Tree(20);
tree1.left.left.right = new Tree(21);
tree1.left.right.left = new Tree(22);
tree1.left.right.right = new Tree(24);
tree1.right.left.left = new Tree(25);
tree1.right.right.right = new Tree(27);

const tree2 = new Tree(12);
tree2.left = new Tree(7);
tree2.right = new Tree(1);
tree2.left.left = new Tree(9);
tree2.left.right = new Tree(2);
tree2.right.left = new Tree(10);
tree2.right.right = new Tree(5);

const tree3 = new Tree(12);
tree3.left = new Tree(7);
tree3.right = new Tree(1);
tree3.right.left = new Tree(10);
tree3.right.right = new Tree(5);
tree3.right.left.left = new Tree(17);
tree3.right.right.right = new Tree(21);

const tree4 = null;

console.log(binaryTreeMaxDepth(tree1));
console.log(binaryTreeMaxDepth(tree2));
console.log(binaryTreeMaxDepth(tree3));
console.log(binaryTreeMaxDepth(tree4));
