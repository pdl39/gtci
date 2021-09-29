/* Given a binary tree and a number ‘S’, find all paths from root-to-leaf such that the sum of all the node values of each path equals ‘S’. */

const Tree = require('../../ds/BinaryTree');

// T: O()
// S: O()
// where

const findAllPathsForASum = (root, s) => {
  const allPaths = [];
  findAllPaths(root, s, new Array(), allPaths);
  return allPaths;
}

const findAllPaths = (current, s, currentPath, allPaths) => {
  if (!current) return;

  currentPath.push(current.value);

  if (!current.left && !current.right && current.value === s) {
    allPaths.push(...currentPath);
  }
  else {
    s -= current.value;
    findAllPaths(current.left, s, currentPath, allPaths);
    findAllPaths(current.right, s, currentPath, allPaths);
  }
  // we need to remove the current node from the currentPath array when we go back up the recursive call stack.
  currentPath.pop();
}


// TEST
const tree1 = new Tree(5);
tree1.left = new Tree(8);
tree1.right = new Tree(9);
tree1.left.left = new Tree(1);
tree1.left.right = new Tree(2);
tree1.right.left = new Tree(11);
tree1.right.right = new Tree(13);
tree1.left.left.left = new Tree(2);
tree1.left.left.right = new Tree(21);
tree1.left.right.left = new Tree(22);
tree1.left.right.right = new Tree(1);
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

console.log(findAllPathsForASum(tree1, 16));
console.log(findAllPathsForASum(tree1, 50));
// console.log(findAllPathsForASum(tree2, 28));
// console.log(findAllPathsForASum(tree2, 18));
// console.log(findAllPathsForASum(tree2, 23));
// console.log(findAllPathsForASum(tree3, 12));
// console.log(findAllPathsForASum(tree3, 19));
// console.log(findAllPathsForASum(tree3, 39));
// console.log(findAllPathsForASum(tree3, 35));
// console.log(findAllPathsForASum(tree3, 40));
// console.log(findAllPathsForASum(tree3, 72));
// console.log(findAllPathsForASum(tree4, 5));
