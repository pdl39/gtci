/* Given a binary tree, return an array containing nodes in its left view. The left view of a binary tree is the set of nodes visible when the tree is seen from the left side. */

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

// T: O(n) --> traverse each tree node once.
// S: O(n) --> n for the queue.
// where n = # of nodes in the tree.

// This question is essentially the same as 11-binary-tree-right-view, except that here, we add the first node of each level instead of the last node.

const binaryTreeLeftView = (root) => {
  if (!root) return null;

  const leftViewTree = [];
  const queue = new Queue(root);

  while (queue.length) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const current = queue.dequeue().value;

      if (i === 0) {
        leftViewTree.push(current.value);
      }

      if (current.left) queue.add(current.left);
      if (current.right) queue.add(current.right);
    }
  }

  return leftViewTree;
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
tree3.right.right.right.left = new Tree(29);
tree3.right.right.right.right = new Tree(33);

const tree4 = null;

console.log(binaryTreeLeftView(tree1));
console.log(binaryTreeLeftView(tree2));
console.log(binaryTreeLeftView(tree3));
console.log(binaryTreeLeftView(tree4));
