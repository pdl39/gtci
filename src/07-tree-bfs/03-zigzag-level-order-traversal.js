/* Given a binary tree, populate an array to represent its zigzag level order traversal. You should populate the values of all nodes of the first level from left to right, then right to left for the next level and keep alternating in the same manner for the following levels. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

// T: O(n) --> traverse each node once.
// S: O(n) --> n for the output array, n for the queue.
// where n = # of nodes in the tree.

const zigzagLevelOrderTraverse = (root) => {
  const zigzagLevelOrderTree = [];
  const queue = new Queue(root);
  let currentLevelNum = 0;

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = new Queue(); // note this is a linkedlist.

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;
      // Based on the current level, if it is odd, we will append the current node to the front, otherwise we will add to the end.
      if (currentLevelNum % 2 !== 0) {
        currentLevel.unshift(current.value);
      }
      else {
        currentLevel.add(current.value);
      }

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }

    zigzagLevelOrderTree.push(currentLevel.printList()); // let's ignore the time complexity for printList method, as this is just a visual sugar for displaying the result in array form.
    currentLevelNum++;
  }

  return zigzagLevelOrderTree;
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

console.log(zigzagLevelOrderTraverse(tree1));
