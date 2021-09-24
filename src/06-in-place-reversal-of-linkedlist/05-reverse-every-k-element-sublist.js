/* Given the head of a LinkedList and a number ‘k’, reverse every ‘k’ sized sub-list starting from the head.

If, in the end, you are left with a sub-list with less than ‘k’ elements, reverse it too. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

// This question is very similar to 02-reverse-a-sublist, except that here we reverse multiple k-length sublists, updating p and q as we go.

// #1: Using the reverseSublist function.

const reverseEveryKElements = (head, k) => {
  if (!head || k < 2) return head;

  const n = getLinkedlistLength(head);

  let p = 1, q = k;

  while (p <= n) {
    head = reverseSublist(head, p, q);
    p = q + 1;
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

// #2: A revised version of the reverseSublist function.
const reverseEveryKElements2 = (head, k) => {
  if (!head || k < 2) return head;

  let p = 1, q = k;

  let current = head;
  let prev = null;

  while (current) {
    let lastNodeBeforeSublist = prev;
    let lastNodeOfReversedSublist = current;

    while (current && p <= q) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;

      p++;
    }

    // At this point, prev will be the first node of the reversed sublist & current will be the first node of the remaining linked list.
    if (lastNodeBeforeSublist) {
      lastNodeBeforeSublist.next = prev;
    }
    else {
      head = prev;
    }

    // lastNodeBeforeSublist = lastNodeOfReversedSublist;
    prev = lastNodeOfReversedSublist;
    lastNodeOfReversedSublist.next = current;

    q = p + k - 1;
  }

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

const reversedEx1 = reverseEveryKElements(ex1Node, 3);
console.log(reversedEx1.printDiagram());
const revertedEx1 = reverseEveryKElements(reversedEx1, 3);
console.log(revertedEx1.printDiagram());

console.log('------');

const reversedEx2 = reverseEveryKElements(ex1Node, 2);
console.log(reversedEx2.printDiagram());
const revertedEx2 = reverseEveryKElements(reversedEx2, 2);
console.log(revertedEx2.printDiagram());

console.log('------');

const reversedEx3 = reverseEveryKElements(ex1Node, 1);
console.log(reversedEx3.printDiagram());
const revertedEx3 = reverseEveryKElements(reversedEx3, 1);
console.log(revertedEx3.printDiagram());

console.log('------');

const reversedEx4 = reverseEveryKElements(ex1Node, 6);
console.log(reversedEx4.printDiagram());
const revertedEx4 = reverseEveryKElements(reversedEx4, 6);
console.log(revertedEx4.printDiagram());

console.log('------');

const reversedEx5 = reverseEveryKElements(ex1Node, 15);
console.log(reversedEx5.printDiagram());
const revertedEx5 = reverseEveryKElements(reversedEx5, 15);
console.log(revertedEx5.printDiagram());

console.log('------');

const reversedEx6 = reverseEveryKElements(ex1Node, 9);
console.log(reversedEx6.printDiagram());
const revertedEx6 = reverseEveryKElements(reversedEx6, 9);
console.log(revertedEx6.printDiagram());

console.log('------');

const reversedEx7 = reverseEveryKElements(ex1Node, 8);
console.log(reversedEx7.printDiagram());
const revertedEx7 = reverseEveryKElements(reversedEx7, 8);
console.log(revertedEx7.printDiagram());

/* ----------------------------------------------------- */
console.log('\n==========================================\n');
/* ----------------------------------------------------- */

const reversed_2_Ex1 = reverseEveryKElements2(ex1Node, 3);
console.log(reversed_2_Ex1.printDiagram());
const reverted_2_Ex1 = reverseEveryKElements2(reversed_2_Ex1, 3);
console.log(reverted_2_Ex1.printDiagram());

console.log('------');

const reversed_2_Ex2 = reverseEveryKElements2(ex1Node, 2);
console.log(reversed_2_Ex2.printDiagram());
const reverted_2_Ex2 = reverseEveryKElements2(reversed_2_Ex2, 2);
console.log(reverted_2_Ex2.printDiagram());

console.log('------');

const reversed_2_Ex3 = reverseEveryKElements2(ex1Node, 1);
console.log(reversed_2_Ex3.printDiagram());
const reverted_2_Ex3 = reverseEveryKElements2(reversed_2_Ex3, 1);
console.log(reverted_2_Ex3.printDiagram());

console.log('------');

const reversed_2_Ex4 = reverseEveryKElements2(ex1Node, 6);
console.log(reversed_2_Ex4.printDiagram());
const reverted_2_Ex4 = reverseEveryKElements2(reversed_2_Ex4, 6);
console.log(reverted_2_Ex4.printDiagram());

console.log('------');

const reversed_2_Ex5 = reverseEveryKElements2(ex1Node, 15);
console.log(reversed_2_Ex5.printDiagram());
const reverted_2_Ex5 = reverseEveryKElements2(reversed_2_Ex5, 15);
console.log(reverted_2_Ex5.printDiagram());

console.log('------');

const reversed_2_Ex6 = reverseEveryKElements2(ex1Node, 9);
console.log(reversed_2_Ex6.printDiagram());
const reverted_2_Ex6 = reverseEveryKElements2(reversed_2_Ex6, 9);
console.log(reverted_2_Ex6.printDiagram());

console.log('------');

const reversed_2_Ex7 = reverseEveryKElements2(ex1Node, 8);
console.log(reversed_2_Ex7.printDiagram());
const reverted_2_Ex7 = reverseEveryKElements2(reversed_2_Ex7, 8);
console.log(reverted_2_Ex7.printDiagram());

