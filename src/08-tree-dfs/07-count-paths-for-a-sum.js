/* Given a binary tree and a number ‘S’, find all paths in the tree such that the sum of all the node values of each path equals ‘S’. Please note that the paths can start or end at any node but all paths must follow direction from parent to child (top to bottom). */

const Tree = require('../../ds/BinaryTree');

// T: O(n^2) --> we traverse each node once, and for each node, we run n operations in the worst case (# of nodes in currentPath). If the tree is balanced, this would be logn, and the overall time would be O(nlogn).
// S: O(n) --> n for the recursion stack. n for currentPath array.
// where n = # of nodes in the tree.

const countPathsForASum = (root, s) => {
  return countPathsForASumRecursive(root, s, new Array());
}

const countPathsForASumRecursive = (current, s, currentPath) => {
  if (!current) return 0;

  currentPath.push(current.value);
  let pathCount = 0;
  let pathSum = 0;

  for (let i = currentPath.length - 1; i >= 0; i--) {
    pathSum += currentPath[i];

    if (pathSum === s) pathCount++;
  }

  pathCount += countPathsForASumRecursive(current.left, s, currentPath);
  pathCount += countPathsForASumRecursive(current.right, s, currentPath);

  currentPath.pop();
  return pathCount;
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
tree2.right.right = new Tree(5);

const tree3 = null;

console.log(countPathsForASum(tree1, 1));
console.log(countPathsForASum(tree1, 2));
console.log(countPathsForASum(tree1, 3));
console.log(countPathsForASum(tree1, 9));
console.log(countPathsForASum(tree1, 7));
console.log(countPathsForASum(tree2, 10));
