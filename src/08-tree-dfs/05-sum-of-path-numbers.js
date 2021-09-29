/* Given a binary tree where each node can only have a digit (0-9) value, each root-to-leaf path will represent a number. Find the total sum of all the numbers represented by all paths. */

const Tree = require('../../ds/BinaryTree');

// T: O(n^2) --> we need to traverse each tree node once, and for each leaf node, we need in worst case n operations to join the array of strings into string for conversion into number.
// S: O(n) --> n for the call stack, which will be the height of the tree, which in the worst case will be n. Also, each currentNumber will be an array of a path's node values stringified, which will also have as many nodes as the height of the tree.
// where n = # of nodes in the tree.

const sumOfPathNumbers = (root) => {
  if (!root) return null;

  const obj = {
    currentNumber: [],
    sum: 0
  };
  sumOfPathNumbersRecursive(root, obj);
  return obj.sum;
}

const sumOfPathNumbersRecursive = (current, obj) => {
  if (!current) return;

  obj.currentNumber.push(current.value.toString());

  if (!current.left && !current.right) {
    const currentNum = parseInt(obj.currentNumber.join(''), 10);
    obj.sum += currentNum;
  }
  else {
    sumOfPathNumbersRecursive(current.left, obj);
    sumOfPathNumbersRecursive(current.right, obj);
  }

  obj.currentNumber.pop();
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
// 171 + 172 + 183 + 185 = 711

const tree3 = null;

console.log(sumOfPathNumbers(tree1));
console.log(sumOfPathNumbers(tree2));
console.log(sumOfPathNumbers(tree3));
