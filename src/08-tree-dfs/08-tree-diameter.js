/* Given a binary tree, find the length of its diameter. The diameter of a tree is the number of nodes on the longest path between any two leaf nodes. The diameter of a tree may or may not pass through the root.

Note: You can always assume that there are at least two leaf nodes in the given tree. */

const Tree = require('../../ds/BinaryTree');

// T: O(n) --> we traverse each tree node once.
// S: O(n) --> n for the recursive stack, which corresponds to the height of the tree, but is n in the worst case.
// where n = # of nodes in the tree.

const treeDiameter = (root) => {
  const result = { max: 0 };
  treeDiameterRecursive(root, result);
  return result.max;
}

const treeDiameterRecursive = (current, result) => {
  if (!current) return 0;

  let leftPathLen = treeDiameterRecursive(current.left, result);
  let rightPathLen = treeDiameterRecursive(current.right, result);

  result.max = Math.max(result.max, leftPathLen + rightPathLen + 1);

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
