/* Given the head of a Singly LinkedList and a number ‘k’, rotate the LinkedList to the right by ‘k’ nodes.

Ex1.
input linkedlist:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
k = 3
output linkedlist:
4 -> 5 -> 6 -> 1 -> 2 -> 3 -> null

Ex2.
input linkedlist:
1 -> 2 -> 3 -> 4 -> 5 -> null
k = 8
output linkedlist:
4 -> 5 -> 1 -> 2 -> 3 -> null */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

const rotateLinkedlist = (head, k) => {
  if (!head || !head.next || k < 1) return head;

  const n = getLinkedlistLength(head);

  let current = head;
  let prev = null;

  // iterate to the tail node and connect the tail node to the head node, making a cycle.
  while (current) {
    prev = current;
    current = current.next;
  }
  // Here, prev is the tail node. Let's connect it to the head to make a cycle.
  prev.next = head;

  // reset current back to the head, and iterate to the target position.
  const targetPosition = (k % n) + 1;
  let currentPosition = 1;
  current = head;

  while (current && currentPosition < targetPosition) {
    prev = current;
    current = current.next;

    currentPosition++;
  }
  // Here, current is the target position node. Let's set this as the new head.
  head = current;
  currentPosition = 1;

  // starting from the new head, iterate by n to get to the new tail node.
  while (current && currentPosition < n) {
    prev = current;
    current = current.next;

    currentPosition++;
  }
  // Here, current is the new tail node. Let's connect this to null, to revert it back to a non-cyclical singly linked list.
  current.next = null;

  return head;
}

const getLinkedlistLength = (head) => {
  let current = head;
  let n = 0;

  while (current) {
    n++;
    current = current.next;
  }

  return n;
}


// TEST
const ex1Node = new Node(1);
ex1Node.next = new Node(2);
ex1Node.next.next = new Node(3);
ex1Node.next.next.next = new Node(4);
ex1Node.next.next.next.next = new Node(5);
ex1Node.next.next.next.next.next = new Node(6);
ex1Node.next.next.next.next.next.next = new Node(7);
ex1Node.next.next.next.next.next.next.next = new Node(8);
ex1Node.next.next.next.next.next.next.next.next = new Node(9);

const ex2Node = new Node(1);
ex2Node.next = new Node(2);
ex2Node.next.next = new Node(3);
ex2Node.next.next.next = new Node(4);
ex2Node.next.next.next.next = new Node(5);
ex2Node.next.next.next.next.next = new Node(6);
ex2Node.next.next.next.next.next.next = new Node(7);
ex2Node.next.next.next.next.next.next.next = new Node(8);
ex2Node.next.next.next.next.next.next.next.next = new Node(9);

const ex3Node = new Node(1);
ex3Node.next = new Node(2);
ex3Node.next.next = new Node(3);
ex3Node.next.next.next = new Node(4);
ex3Node.next.next.next.next = new Node(5);
ex3Node.next.next.next.next.next = new Node(6);
ex3Node.next.next.next.next.next.next = new Node(7);
ex3Node.next.next.next.next.next.next.next = new Node(8);

const ex4Node = new Node(1);
ex4Node.next = new Node(2);
ex4Node.next.next = new Node(3);
ex4Node.next.next.next = new Node(4);
ex4Node.next.next.next.next = new Node(5);
ex4Node.next.next.next.next.next = new Node(6);
ex4Node.next.next.next.next.next.next = new Node(7);
ex4Node.next.next.next.next.next.next.next = new Node(8);

const ex5Node = new Node(1);

const ex6Node = new Node(1);
ex6Node.next = new Node(2);

const ex7Node = new Node(1);
ex7Node.next = new Node(2);
ex7Node.next.next = new Node(3);

const ex8Node = new Node(1);
ex8Node.next = new Node(2);
ex8Node.next.next = new Node(3);
ex8Node.next.next.next = new Node(4);

const ex9Node = new Node(1);
ex9Node.next = new Node(2);


const rotatedEx1 = rotateLinkedlist(ex1Node, 5);
console.log(rotatedEx1.printDiagram());

console.log('------');

const rotatedEx2 = rotateLinkedlist(ex2Node, 3);
console.log(rotatedEx2.printDiagram());

console.log('------');

const rotatedEx3 = rotateLinkedlist(ex3Node, 15);
console.log(rotatedEx3.printDiagram());

console.log('------');

const rotatedEx4 = rotateLinkedlist(ex4Node, 4);
console.log(rotatedEx4.printDiagram());

console.log('------');

const rotatedEx5 = rotateLinkedlist(ex5Node, 9);
console.log(rotatedEx5.printDiagram());

console.log('------');

const rotatedEx6 = rotateLinkedlist(ex6Node, 1);
console.log(rotatedEx6.printDiagram());

console.log('------');

const rotatedEx7 = rotateLinkedlist(ex7Node, 2);
console.log(rotatedEx7.printDiagram());

console.log('------');

const rotatedEx8 = rotateLinkedlist(ex8Node, 5);
console.log(rotatedEx8.printDiagram());

console.log('------');

const rotatedEx9 = rotateLinkedlist(ex9Node, 2);
console.log(rotatedEx9.printDiagram());
