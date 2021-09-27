/* Given a binary tree and a node, find the level order successor of the given node in the tree. The level order successor is the node that appears right after the given node in the level order traversal.

Ex.1
        1
    2       3
  4   5   6   7
Given node: 3
Successor: 4

Ex.2
        1
    2       3
  4   5   6   7
Given node: 5
Successor: 6
*/

const Tree = require('../../ds/BinaryTree');
const Queue = require('../../ds/Queue');

// T: O(n) --> traverse each tree node once.
// S: O(n) --> n for the queue.
// where n = # of nodes in the tree.

// This question is very similar to simple level order traversal (01-binary-tree-level-order-traversal), except that here, we don't have to keep track of each level, but just add all nodes to the queue one by one and simply return the next node when we have reached the given node.

const levelOrderSuccessor = (root, key) => {
  if (!root) return undefined;

  let isGivenNodeReached = false;
  const queue = new Queue(root);

  while (queue.length) {
    const current = queue.dequeue().value;

    if (isGivenNodeReached) return current.value;

    if (current.value === key) {
      isGivenNodeReached = true;
    }

    if (current.left) queue.add(current.left);
    if (current.right) queue.add(current.right);
  }

  return undefined;
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

const tree4 = null;

console.log(levelOrderSuccessor(tree1, 9));
console.log(levelOrderSuccessor(tree1, 3));
console.log(levelOrderSuccessor(tree1, 20));
console.log(levelOrderSuccessor(tree1, 27));
console.log(levelOrderSuccessor(tree2, 12));
console.log(levelOrderSuccessor(tree2, 7));
console.log(levelOrderSuccessor(tree2, 2));
console.log(levelOrderSuccessor(tree2, 5));
console.log(levelOrderSuccessor(tree3, 12));
console.log(levelOrderSuccessor(tree3, 5));
console.log(levelOrderSuccessor(tree4, 5));


