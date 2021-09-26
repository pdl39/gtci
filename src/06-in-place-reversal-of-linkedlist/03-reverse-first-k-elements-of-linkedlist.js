/* Reverse the first ‘k’ elements of a given LinkedList. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

// This question is essentially the same as 02-reverse-a-sublist, except here, the 'first k elements of linkedlist' means p = 1 and q = k.

const reverseFirstKElements = (head, k) => {
  if (k === 1) return head;

  let current = head;
  let prev = null;

  /* We need to keep track of 2 different sections of the linked list:
    1. the first k elements
    2. first node after reverse ~ tail
  */

  let currentPosition = 1;

  // current should now be the node at position p, which should be the lastNodeOfReversedSublist. Note that the lastNodeOfReversedSublist is actually the first node of the mid section we are keeping track of, which will be the last node of the section after we reverse the section.
  const lastNodeOfReversedSublist = current;

  // until current reaches the node at position q, inclusive, we reverse the sublist in place and continue updating prev and current.
  while (current && currentPosition <= k) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;

    currentPosition++;
  }

  // At this point, prev is the last node of the sublist (or the first node of the reversed sublist), and current is the first node of the last section.
  // we need to set the first node of the reversed sublist to be the head.
  head = prev;

  // connect the end of the reversed sublist to the last section. If there is no last section, firstNodeOfLastSection will already be null, so the following is all we need.
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

const reversedEx1 = reverseFirstKElements(ex1Node, 6);
console.log(reversedEx1.printDiagram());
const revertedEx1 = reverseFirstKElements(reversedEx1, 6);
console.log(revertedEx1.printDiagram());

console.log('------');

const reversedEx2 = reverseFirstKElements(ex1Node, 5);
console.log(reversedEx2.printDiagram());
const revertedEx2 = reverseFirstKElements(reversedEx2, 5);
console.log(revertedEx2.printDiagram());

console.log('------');

const reversedEx3 = reverseFirstKElements(ex1Node, 1);
console.log(reversedEx3.printDiagram());
const revertedEx3 = reverseFirstKElements(reversedEx3, 1);
console.log(revertedEx3.printDiagram());

console.log('------');

const reversedEx4 = reverseFirstKElements(ex1Node, 10);
console.log(reversedEx4.printDiagram());
const revertedEx4 = reverseFirstKElements(reversedEx4, 10);
console.log(revertedEx4.printDiagram());

console.log('------');

const reversedEx5 = reverseFirstKElements(ex1Node, 2);
console.log(reversedEx5.printDiagram());
const revertedEx5 = reverseFirstKElements(reversedEx5, 2);
console.log(revertedEx5.printDiagram());

