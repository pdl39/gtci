/* Given a binary tree, populate an array to represent its level-by-level traversal in reverse order, i.e., the lowest level comes first. You should populate the values of all nodes in each level from left to right in separate sub-arrays. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');


// #2: Using queue (linked list) instead of array for the result.
// T: O(n) --> traverse each tree node once.
// S: O(n) --> O(2n): n for the output queue, and n for the intermediate queue.
// where n = # of nodes in the tree.

const reverseLevelOrderTraverse2 = (root) => {
  const levelOrderTree = new Queue();
  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;
      currentLevel.push(current.value);

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }

    levelOrderTree.unshift(currentLevel);
  }

  return levelOrderTree.printList();
}


// #1: Using one more array for the result.
// T: O(n) --> O(n + logn): traverse each tree node once and then logn (# of levels, or depth of tree) for re-pushing the levels to the final output array.
// S: O(n) --> O(3n): n for the output array, n for the intermediate array to store in-order levels, and n for the queue.
// where n = # of nodes in the tree.

const reverseLevelOrderTraverse = (root) => {
  const levelOrderTree = [];
  const reverseLevelOrderTree = [];

  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;
      currentLevel.push(current.value);

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }

    levelOrderTree.push(currentLevel);
  }

  while (levelOrderTree.length) {
    reverseLevelOrderTree.push(levelOrderTree.pop());
  }

  return reverseLevelOrderTree;
}


// TEST
const tree1 = new Tree(5);
tree1.left = new Tree(8);
tree1.left.left = new Tree(3);
tree1.left.right = new Tree(4);
tree1.right = new Tree(9);
tree1.right.left = new Tree(11);


console.log(reverseLevelOrderTraverse2(tree1));
console.log(reverseLevelOrderTraverse(tree1));
