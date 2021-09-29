/* Given a binary tree and a number sequence, find if the sequence is present as a root-to-leaf path in the given tree. */

const Tree = require('../../ds/BinaryTree');

// T: O(n) --> we traverse each tree node once.
// S: O(n) --> n for the call stack.
// where n = # of nodes in the tree.

const pathWithGivenSequence = (root, sequence) => {
  return pathWithGivenSequenceRecursive(root, 0, sequence);
}

const pathWithGivenSequenceRecursive = (current, currentLevel, sequence) => {
  if (!current) return false;

  if (sequence[currentLevel] !== current.value) return false;

  if (!current.left && !current.right && sequence[currentLevel] === current.value) {
    return true;
  }

  return pathWithGivenSequenceRecursive(current.left, currentLevel + 1, sequence) || pathWithGivenSequenceRecursive(current.right, currentLevel + 1, sequence);
}


// TEST
const tree1 = new Tree(1);
tree1.left = new Tree(2);
tree1.right = new Tree(3);
tree1.left.left = new Tree(4);
tree1.left.right = new Tree(5);
tree1.right.left = new Tree(6);
tree1.right.right = new Tree(7);
tree1.left.left.left = new Tree(8);
tree1.left.left.right = new Tree(9);
tree1.left.right.left = new Tree(0);
tree1.left.right.right = new Tree(1);
tree1.right.left.left = new Tree(2);
tree1.right.right.right = new Tree(3);

const tree2 = new Tree(1);
tree2.left = new Tree(7);
tree2.right = new Tree(8);
tree2.left.left = new Tree(1);
tree2.left.right = new Tree(2);
tree2.right.left = new Tree(3);
tree2.right.right = new Tree(5);

const tree3 = null;

console.log(pathWithGivenSequence(tree1, [1, 2, 4, 9]));
console.log(pathWithGivenSequence(tree1, [1, 2, 3, 10]));
console.log(pathWithGivenSequence(tree1, [1, 3, 6, 2]));
console.log(pathWithGivenSequence(tree1, [1, 3, 7, 3]));
console.log(pathWithGivenSequence(tree1, [1, 3, 6, 3]));
console.log(pathWithGivenSequence(tree2, [1, 7, 2]));
console.log(pathWithGivenSequence(tree2, [1, 7, 1]));
console.log(pathWithGivenSequence(tree2, [1, 8, 1]));
console.log(pathWithGivenSequence(tree2, [1, 8, 5]));
console.log(pathWithGivenSequence(tree3, [1]));
