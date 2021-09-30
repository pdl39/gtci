/* Find the path with the maximum sum in a given binary tree. Write a function that returns the maximum sum.

A path can be defined as a sequence of nodes between any two nodes and doesn’t necessarily pass through the root. The path must contain at least one node. */

const Tree = require('../../ds/BinaryTree');

// Note, this solution assumes all nodes will have positive values.
// T: O(n) --> we traverse each tree node once.
// S: O(n) --> n for the recursive stack.
// where n = # of nodes in the tree.

// This question is essentially same as tree-diameter, except that here, we keep track of the path sum instead of path length. This is only when we assume all nodes have positive values, since with only positive values, the max sum will always occur in paths containing leaf nodes - any additional nodes in the path will have greater sum vs. not including it, where as if a node can contain negative values, having additional nodes in the path may actually reduce the sum.

const pathWithMaxSum = (root) => {
  const sum = { max: 0 };
  pathWithMaxSumRecursive(root, sum);
  return sum.max;
}

const pathWithMaxSumRecursive = (current, sum) => {
  if (!current) return 0;

  let leftPathSum = pathWithMaxSumRecursive(current.left, sum);
  let rightPathSum = pathWithMaxSumRecursive(current.right, sum);

  sum.max = Math.max(sum.max, leftPathSum + rightPathSum + current.value);

  return Math.max(leftPathSum, rightPathSum) + current.value;
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

const tree3 = new Tree(1);
tree3.left = new Tree(2);
tree3.right = new Tree(3);

const tree4 = new Tree(1);
tree4.left = new Tree(2);
tree4.right = new Tree(3);
tree4.right.left = new Tree(5);
tree4.right.right = new Tree(6);

const tree5 = new Tree(1);
tree5.left = new Tree(2);
tree5.right = new Tree(3);
tree5.right.left = new Tree(5);
tree5.right.right = new Tree(6);
tree5.right.right.right = new Tree(2);


console.log(pathWithMaxSum(tree1));
console.log(pathWithMaxSum(tree2));
console.log(pathWithMaxSum(tree3));
console.log(pathWithMaxSum(tree4));
console.log(pathWithMaxSum(tree5));
