/* Given a binary tree, find the length of its diameter. The diameter of a tree is the number of nodes on the longest path between any two leaf nodes. The diameter of a tree may or may not pass through the root.

Note: You can always assume that there are at least two leaf nodes in the given tree. */

const Tree = require('../../ds/BinaryTree');

// T: O(n) --> we traverse each tree node once.
// S: O(n) --> n for the recursive stack, which corresponds to the height of the tree, but is n in the worst case.
// where n = # of nodes in the tree.

const treeDiameter = (root) => {
  // we pass down an object containing the result variable (max) to keep track of the running max value throughout the recursive calls.
  const result = { max: 0 };
  treeDiameterRecursive(root, result);
  return result.max;
}

const treeDiameterRecursive = (current, result) => {
  if (!current) return 0;

  let leftPathLen = treeDiameterRecursive(current.left, result);
  let rightPathLen = treeDiameterRecursive(current.right, result);

  // The diameter of the path with the current node as the root will be the sum of its left path length, right path length, and 1 (for itself).
  // We will compare this with the current max tree diameter, and update the max diameter if the current diameter is bigger.
  result.max = Math.max(result.max, leftPathLen + rightPathLen + 1);

  // We will return the max path length of the node's left or right path + 1. This will be used as the child path length for its parent to calculate the diameter.
  return Math.max(leftPathLen, rightPathLen) + 1;
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
tree2.left.left = new Tree(2);
tree2.left.right = new Tree(2);
tree2.right.left = new Tree(1);
tree2.right.left.left = new Tree(3);
tree2.right.left.left.left = new Tree(2);
tree2.right.left.left.left.right = new Tree(5);
tree2.right.right = new Tree(5);
tree2.right.right.left = new Tree(6);
tree2.right.right.left.right = new Tree(7);
tree2.right.right.left.right.right = new Tree(7);


console.log(treeDiameter(tree1));
console.log(treeDiameter(tree2));
