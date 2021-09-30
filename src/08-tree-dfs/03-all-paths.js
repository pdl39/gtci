/* Given a binary tree, return all root-to-leaf paths. */

const Tree = require('../../ds/BinaryTree');

// T: O(n^2) --> we need to traverse each tree node once, and for each node, we need to make a copy of the currentPath array, which requires additional n operations (height # of operations, which in the worst case will be n). If we have, on average, a balanced tree, the average time could be considered O(nlogn).
// S: O(n) --> n for the recursive call stack, which will be the height of the tree - in the worst case, a tree can be a linked list, making its height = n. The output allPaths array requires at most (n + 1) / 2 number of paths - this will be the max number of leaves for a tree, since there will only be as many paths as there are leaf nodes. Each path will contain as many nodes as the height of the tree - all nodes from the root to the leaf. In the worst case height scenario, there will only be one path and allPaths will have n nodes, while if the tree is balanced, height will be logn, making the space requirement for allPaths O(nlogn). So if we have a balanced tree, we can say the space will be O(nlogn).
// where n = # of nodes in the tree.

// This question is essentially the same as 02-all-paths-for-a-sum, except that here, we don't need to check for the path sum at each leaf node, we just add all root-to-leaf paths to the allPaths array.

const findAllPaths = (root) => {
  const allPaths = [];
  findAllPathsRecursive(root, new Array(), allPaths);
  return allPaths;
}

const findAllPathsRecursive = (current, currentPath, allPaths) => {
  if (!current) return;

  currentPath.push(current.value);

  if (!current.left && !current.right) {
    allPaths.push([...currentPath]);
  }
  else {
    findAllPathsRecursive(current.left, currentPath, allPaths);
    findAllPathsRecursive(current.right, currentPath, allPaths);
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

console.log(findAllPaths(tree1));
console.log(findAllPaths(tree2));
console.log(findAllPaths(tree3));
console.log(findAllPaths(tree4));
