/* Given a binary tree, return all root-to-leaf paths. */

const Tree = require('../../ds/BinaryTree');

// T: O(n^2) --> we need to traverse each tree node once, and for each node, we need to make a copy of the currentPath array if we have a new path with bigger sum, which requires additional n operations (height # of operations, which in the worst case will be n). In the worst case, every subsequent path can have a bigger sum than any of its previous paths, which will make the overall time O(n^2).
// S: O(n) --> n for the recursive call stack, which will be the height of the tree - in the worst case, a tree can be a linked list, making its height = n. The output path with the max sum will also have as many nodes as the height of the tree, which in the worst case would be n.
// where n = # of nodes in the tree.

// This question is very similar to 03-all-paths, except that here, instead of adding all root-to-leaf paths to the output array, we keep track of the path sum and the maximum path sum, and update the result as only when the new path's sum is bigger than the current max sum.

const findPathMaxSum = (root) => {
  if (!root) return null;

  const pathWithMaxSum = [];
  const pathInfo = {
    path: [],
    pathWithMaxSum: [],
    sum: 0,
    max: -Infinity,
  }
  findPathMaxSumRecursive(root, pathInfo, pathWithMaxSum);
  return pathInfo.pathWithMaxSum;
}

const findPathMaxSumRecursive = (current, currentPath, pathWithMaxSum) => {
  if (!current) return;

  currentPath.path.push(current.value);
  currentPath.sum += current.value;

  if (!current.left && !current.right) {
    if (currentPath.sum > currentPath.max) {
      currentPath.max = currentPath.sum;
      currentPath.pathWithMaxSum = [...currentPath.path];
    }
  }
  else {
    findPathMaxSumRecursive(current.left, currentPath, pathWithMaxSum);
    findPathMaxSumRecursive(current.right, currentPath, pathWithMaxSum);
  }
  // we need to subtract the current node value from the currentPath sum when we go back up the recursive call stack.
  currentPath.path.pop();
  currentPath.sum -= current.value;
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

console.log(findPathMaxSum(tree1));
console.log(findPathMaxSum(tree2));
console.log(findPathMaxSum(tree3));
console.log(findPathMaxSum(tree4));
