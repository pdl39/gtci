/* Given the head of a LinkedList and two positions ‘p’ and ‘q’, reverse the LinkedList from position ‘p’ to ‘q’. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

const reverseSublist = (head, p, q) => {
  if (p === q) return head;

  let current = head;
  let prev = null;

  /* We need to keep track of 3 different sections of the linked list:
    1. head ~ last node before reverse
    2. the sublist to reverse (first node to reverse ~ last node to reverse)
    3. first node after reverse ~ tail
  */

  let currentPosition = 1;
  // move the current to point to the node at position p, and the prev to point to the node at p - 1.
  while (current && currentPosition < p) {
    prev = current;
    current = current.next;

    currentPosition++;
  }

  // current should now be the node at position p, which should be the lastNodeOfReversedSublist. Note that the lastNodeOfReversedSublist is actually the first node of the mid section we are keeping track of, which will be the last node of the section after we reverse the section.
  const lastNodeOfFirstSection = prev;
  const lastNodeOfReversedSublist = current;

  // until current reaches the node at position q, inclusive, we reverse the sublist in place and continue updating prev and current.
  while (current && currentPosition <= q) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;

    currentPosition++;
  }

  // At this point, prev is the last node of the sublist (or the first node of the reversed sublist), and current if the first node of the last section.
  const firstNodeOfReversedSublist = prev;
  const firstNodeOfLastSection = current;

  // we need to re-connect the reversed sublist to each end of the linked list. As long as we have a non-null last node of first section, its next should be the first node of the reversed sublist. If there is no first section, it means the first node of the reversed sublist should be the head.
  if (lastNodeOfFirstSection) {
    lastNodeOfFirstSection.next = firstNodeOfReversedSublist;
  }
  else {
    head = firstNodeOfReversedSublist;
  }

  // connect the end of the reversed sublist to the last section. If there is no last section, firstNodeOfLastSection will already be null, so the following is all we need.
  lastNodeOfReversedSublist.next = firstNodeOfLastSection;

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

const reversedEx1 = reverseSublist(ex1Node, 3, 6);
console.log(reversedEx1.printDiagram());
const revertedEx1 = reverseSublist(reversedEx1, 3, 6);
console.log(revertedEx1.printDiagram());

console.log('------');

const reversedEx2 = reverseSublist(ex1Node, 1, 5);
console.log(reversedEx2.printDiagram());
const revertedEx2 = reverseSublist(reversedEx2, 1, 5);
console.log(revertedEx2.printDiagram());

console.log('------');

const reversedEx3 = reverseSublist(ex1Node, 4, 4);
console.log(reversedEx3.printDiagram());
const revertedEx3 = reverseSublist(reversedEx3, 4, 4);
console.log(revertedEx3.printDiagram());

console.log('------');

const reversedEx4 = reverseSublist(ex1Node, 2, 10);
console.log(reversedEx4.printDiagram());
const revertedEx4 = reverseSublist(reversedEx4, 2, 10);
console.log(revertedEx4.printDiagram());

