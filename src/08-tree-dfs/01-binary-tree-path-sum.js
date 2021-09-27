/* Given a binary tree and a number ‘S’, find if the tree has a path from root-to-leaf such that the sum of all the node values of that path equals ‘S’. */

const Tree = require('../../ds/BinaryTree');

// T: O(n) --> we traverse each tree node once in the worst case.
// S: O(n) --> h for the stack. In the worst case, h = n, if the tree is a linked list (every tree node has one child). So the worst case space complexity would be O(n).
// where n = # of nodes in the tree, h = height of tree.

const binaryTreePathSum = (current, s) => {
  if (!current) return false;

  // we will return true only when the current node is a leaf node and its value is equal to s.
  if (current.value === s && !current.left && !current.right) {
    return true;
  }

  // otherwise, we recursive call to traverse the left and the right nodes with s subtracted by the current node value, and return true if any of them returns true.
  return binaryTreePathSum(current.left, s - current.value) ||  binaryTreePathSum(current.right, s - current.value);
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

console.log(binaryTreePathSum(tree1, 17));
console.log(binaryTreePathSum(tree1, 36));
console.log(binaryTreePathSum(tree1, 33));
console.log(binaryTreePathSum(tree2, 21));
console.log(binaryTreePathSum(tree2, 28));
console.log(binaryTreePathSum(tree2, 18));
console.log(binaryTreePathSum(tree2, 23));
console.log(binaryTreePathSum(tree3, 12));
console.log(binaryTreePathSum(tree3, 19));
console.log(binaryTreePathSum(tree3, 39));
console.log(binaryTreePathSum(tree3, 35));
console.log(binaryTreePathSum(tree3, 40));
console.log(binaryTreePathSum(tree3, 72));
console.log(binaryTreePathSum(tree4, 5));
