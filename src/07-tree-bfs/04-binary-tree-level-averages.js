/* Given a binary tree, populate an array to represent the averages of all of its levels. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');
const round = require('../../_utils/round');

// T: O(n) --> traverse each tree node once.
// S: O(n) --> n for the queue, logn for the output array.
// where n = # of nodes in the tree.

const binaryTreeLevelAvg = (root) => {
  const levelAverages = [];
  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;
    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;
      levelSum += current.value;

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }

    const levelAvg = round(levelSum/levelSize, 1);
    levelAverages.push(levelAvg);
  }

  return levelAverages;
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

const tree2 = new Tree(12)
tree2.left = new Tree(7)
tree2.right = new Tree(1)
tree2.left.left = new Tree(9)
tree2.left.right = new Tree(2)
tree2.right.left = new Tree(10)
tree2.right.right = new Tree(5)

console.log(binaryTreeLevelAvg(tree1));
console.log(binaryTreeLevelAvg(tree2));
