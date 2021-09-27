/* Given a binary tree, populate an array to represent its level-by-level traversal. You should populate the values of all nodes of each level from left to right in separate sub-arrays. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

// T: O(n) --> we need to traverse each tree node once.
// S: O(n) --> n for the output array & n for the queue.
// where n = # of nodes in the tree.

const traverse = (root) => {
  const levelOrderTree = [];
  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value; // the Queue stores each tree wrapped in a node, so to get the tree, we call the value property.
      currentLevel.push(current.value);

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }

    levelOrderTree.push(currentLevel);
  }

  return levelOrderTree;
}


// TEST
const tree1 = new Tree(5);
tree1.left = new Tree(8);
tree1.left.left = new Tree(3);
tree1.left.right = new Tree(4);
tree1.right = new Tree(9);
tree1.right.left = new Tree(11);


console.log(traverse(tree1));
