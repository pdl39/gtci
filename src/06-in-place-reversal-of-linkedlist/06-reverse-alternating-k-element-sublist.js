/* Given the head of a LinkedList and a number ‘k’, reverse every alternating ‘k’ sized sub-list starting from the head.

If, in the end, you are left with a sub-list with less than ‘k’ elements, reverse it too. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

const reverseAlternatingKElementSublist = (head, k) => {
  if (!head || k < 2) return head;

  const n = getLinkedlistLength(head);
  let p = 1, q = k;

  while (head && p <= n) {
    head = reverseSublist(head, p, q);
    p = q + k + 1;
    q = p + k - 1;
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
ex2Node.next.next.next.next.next.next.next.next = new Node(9);
ex2Node.next.next.next.next.next.next.next.next.next = new Node(10);
ex2Node.next.next.next.next.next.next.next.next.next.next = new Node(11);
ex2Node.next.next.next.next.next.next.next.next.next.next.next = new Node(12);


const reversedEx1 = reverseAlternatingKElementSublist(ex1Node, 3);
console.log(reversedEx1.printDiagram());
const revertedEx1 = reverseAlternatingKElementSublist(reversedEx1, 3);
console.log(revertedEx1.printDiagram());

console.log('------');

const reversedEx2 = reverseAlternatingKElementSublist(ex1Node, 2);
console.log(reversedEx2.printDiagram());
const revertedEx2 = reverseAlternatingKElementSublist(reversedEx2, 2);
console.log(revertedEx2.printDiagram());

console.log('------');

const reversedEx3 = reverseAlternatingKElementSublist(ex1Node, 1);
console.log(reversedEx3.printDiagram());
const revertedEx3 = reverseAlternatingKElementSublist(reversedEx3, 1);
console.log(revertedEx3.printDiagram());

console.log('------');

const reversedEx4 = reverseAlternatingKElementSublist(ex1Node, 6);
console.log(reversedEx4.printDiagram());
const revertedEx4 = reverseAlternatingKElementSublist(reversedEx4, 6);
console.log(revertedEx4.printDiagram());

console.log('------');

const reversedEx5 = reverseAlternatingKElementSublist(ex1Node, 15);
console.log(reversedEx5.printDiagram());
const revertedEx5 = reverseAlternatingKElementSublist(reversedEx5, 15);
console.log(revertedEx5.printDiagram());

console.log('------');

const reversedEx6 = reverseAlternatingKElementSublist(ex1Node, 9);
console.log(reversedEx6.printDiagram());
const revertedEx6 = reverseAlternatingKElementSublist(reversedEx6, 9);
console.log(revertedEx6.printDiagram());

console.log('------');

const reversedEx7 = reverseAlternatingKElementSublist(ex1Node, 8);
console.log(reversedEx7.printDiagram());
const revertedEx7 = reverseAlternatingKElementSublist(reversedEx7, 8);
console.log(revertedEx7.printDiagram());

console.log('------');

const reversedEx8 = reverseAlternatingKElementSublist(ex2Node, 3);
console.log(reversedEx8.printDiagram());
const revertedEx8 = reverseAlternatingKElementSublist(reversedEx8, 3);
console.log(revertedEx8.printDiagram());

console.log('------');

const reversedEx9 = reverseAlternatingKElementSublist(ex2Node, 2);
console.log(reversedEx9.printDiagram());
const revertedEx9 = reverseAlternatingKElementSublist(reversedEx9, 2);
console.log(revertedEx9.printDiagram());

console.log('------');

const reversedEx10 = reverseAlternatingKElementSublist(ex2Node, 4);
console.log(reversedEx10.printDiagram());
const revertedEx10 = reverseAlternatingKElementSublist(reversedEx10, 4);
console.log(revertedEx10.printDiagram());

console.log('------');

const reversedEx11 = reverseAlternatingKElementSublist(ex2Node, 5);
console.log(reversedEx11.printDiagram());
const revertedEx11 = reverseAlternatingKElementSublist(reversedEx11, 5);
console.log(revertedEx11.printDiagram());

console.log('------');

const reversedEx12 = reverseAlternatingKElementSublist(ex2Node, 6);
console.log(reversedEx12.printDiagram());
const revertedEx12 = reverseAlternatingKElementSublist(reversedEx12, 6);
console.log(revertedEx12.printDiagram());

console.log('------');

const reversedEx13 = reverseAlternatingKElementSublist(ex2Node, 7);
console.log(reversedEx13.printDiagram());
const revertedEx13 = reverseAlternatingKElementSublist(reversedEx13, 7);
console.log(revertedEx13.printDiagram());
