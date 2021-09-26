/* Given a LinkedList with ‘n’ nodes, reverse it based on its size in the following way:

- If ‘n’ is even, reverse the list in a group of n/2 nodes.
- If n is odd, keep the middle node as it is, reverse the first ‘n/2’ nodes and reverse the last ‘n/2’ nodes. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

// This problem extends from 02-reverse-a-sublist.

const reverseHalves = (head) => {
  const n = getLinkedlistLength(head);
  if (n < 4) return head;

  const midpoint = Math.floor(n/2);
  if (n % 2 === 0) { // even case
    head = reverseSublist(head, 1, midpoint);
    head = reverseSublist(head, midpoint + 1, n);
  }
  else { // odd case
    head = reverseSublist(head, 1, midpoint);
    head = reverseSublist(head, midpoint + 2, n); // midpoint + 2 ensures we keep the middle node as is.
  }

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

const reverseSublist = (head, p, q) => {
  if (p === q) return head;

  let current = head;
  let prev = null;

  let currentPosition = 1;
  while (current && currentPosition < p) {
    prev = current;
    current = current.next;

    currentPosition++;
  }

  const lastNodeOfFirstSection = prev;
  const lastNodeOfReversedSublist = current;

  while (current && currentPosition <= q) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;

    currentPosition++;
  }

  if (lastNodeOfFirstSection) {
    lastNodeOfFirstSection.next = prev;
  }
  else {
    head = prev;
  }

  lastNodeOfReversedSublist.next = current;

  return head;
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

const ex3Node = new Node(1);

const ex4Node = new Node(1);
ex4Node.next = new Node(2);

const ex5Node = new Node(1);
ex5Node.next = new Node(2);
ex5Node.next.next = new Node(3);

const ex6Node = new Node(1);
ex6Node.next = new Node(2);
ex6Node.next.next = new Node(3);
ex6Node.next.next.next = new Node(4);

const reversedEx1 = reverseHalves(ex1Node);
console.log(reversedEx1.printDiagram());
const revertedEx1 = reverseHalves(reversedEx1);
console.log(revertedEx1.printDiagram());

console.log('------');

const reversedEx2 = reverseHalves(ex2Node);
console.log(reversedEx2.printDiagram());
const revertedEx2 = reverseHalves(reversedEx2);
console.log(revertedEx2.printDiagram());

console.log('------');

const reversedEx3 = reverseHalves(ex3Node);
console.log(reversedEx3.printDiagram());
const revertedEx3 = reverseHalves(reversedEx3);
console.log(revertedEx3.printDiagram());

console.log('------');

const reversedEx4 = reverseHalves(ex4Node);
console.log(reversedEx4.printDiagram());
const revertedEx4 = reverseHalves(reversedEx4);
console.log(revertedEx4.printDiagram());

console.log('------');

const reversedEx5 = reverseHalves(ex5Node);
console.log(reversedEx5.printDiagram());
const revertedEx5 = reverseHalves(reversedEx5);
console.log(revertedEx5.printDiagram());

console.log('------');

const reversedEx6 = reverseHalves(ex6Node);
console.log(reversedEx6.printDiagram());
const revertedEx6 = reverseHalves(reversedEx6);
console.log(revertedEx6.printDiagram());

