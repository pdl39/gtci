/* Given the head of a LinkedList and a number ‘k’, reverse every alternating ‘k’ sized sub-list starting from the head.

If, in the end, you are left with a sub-list with less than ‘k’ elements, reverse it too. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

// This question is very similar to 05-reverse-every-k-element-sublist, except that here we don't reverse every k-element sublist, but every other k-element sublist.

// #1: Using reverseSublist function.
const reverseAlternatingKElementSublists = (head, k) => {
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


// #2: A revised version of the reverseSublist function.
const reverseAlternatingKElementSublists2 = (head, k) => {
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

    // skip alternating k-elements.
    while (current && p <= q + k) {
      prev = current;
      current = current.next;
      p++;
    }
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


const reversedEx1 = reverseAlternatingKElementSublists(ex1Node, 3);
console.log(reversedEx1.printDiagram());
const revertedEx1 = reverseAlternatingKElementSublists(reversedEx1, 3);
console.log(revertedEx1.printDiagram());

console.log('------');

const reversedEx2 = reverseAlternatingKElementSublists(ex1Node, 2);
console.log(reversedEx2.printDiagram());
const revertedEx2 = reverseAlternatingKElementSublists(reversedEx2, 2);
console.log(revertedEx2.printDiagram());

console.log('------');

const reversedEx3 = reverseAlternatingKElementSublists(ex1Node, 1);
console.log(reversedEx3.printDiagram());
const revertedEx3 = reverseAlternatingKElementSublists(reversedEx3, 1);
console.log(revertedEx3.printDiagram());

console.log('------');

const reversedEx4 = reverseAlternatingKElementSublists(ex1Node, 6);
console.log(reversedEx4.printDiagram());
const revertedEx4 = reverseAlternatingKElementSublists(reversedEx4, 6);
console.log(revertedEx4.printDiagram());

console.log('------');

const reversedEx5 = reverseAlternatingKElementSublists(ex1Node, 15);
console.log(reversedEx5.printDiagram());
const revertedEx5 = reverseAlternatingKElementSublists(reversedEx5, 15);
console.log(revertedEx5.printDiagram());

console.log('------');

const reversedEx6 = reverseAlternatingKElementSublists(ex1Node, 9);
console.log(reversedEx6.printDiagram());
const revertedEx6 = reverseAlternatingKElementSublists(reversedEx6, 9);
console.log(revertedEx6.printDiagram());

console.log('------');

const reversedEx7 = reverseAlternatingKElementSublists(ex1Node, 8);
console.log(reversedEx7.printDiagram());
const revertedEx7 = reverseAlternatingKElementSublists(reversedEx7, 8);
console.log(revertedEx7.printDiagram());

console.log('------');

const reversedEx8 = reverseAlternatingKElementSublists(ex2Node, 3);
console.log(reversedEx8.printDiagram());
const revertedEx8 = reverseAlternatingKElementSublists(reversedEx8, 3);
console.log(revertedEx8.printDiagram());

console.log('------');

const reversedEx9 = reverseAlternatingKElementSublists(ex2Node, 2);
console.log(reversedEx9.printDiagram());
const revertedEx9 = reverseAlternatingKElementSublists(reversedEx9, 2);
console.log(revertedEx9.printDiagram());

console.log('------');

const reversedEx10 = reverseAlternatingKElementSublists(ex2Node, 4);
console.log(reversedEx10.printDiagram());
const revertedEx10 = reverseAlternatingKElementSublists(reversedEx10, 4);
console.log(revertedEx10.printDiagram());

console.log('------');

const reversedEx11 = reverseAlternatingKElementSublists(ex2Node, 5);
console.log(reversedEx11.printDiagram());
const revertedEx11 = reverseAlternatingKElementSublists(reversedEx11, 5);
console.log(revertedEx11.printDiagram());

console.log('------');

const reversedEx12 = reverseAlternatingKElementSublists(ex2Node, 6);
console.log(reversedEx12.printDiagram());
const revertedEx12 = reverseAlternatingKElementSublists(reversedEx12, 6);
console.log(revertedEx12.printDiagram());

console.log('------');

const reversedEx13 = reverseAlternatingKElementSublists(ex2Node, 7);
console.log(reversedEx13.printDiagram());
const revertedEx13 = reverseAlternatingKElementSublists(reversedEx13, 7);
console.log(revertedEx13.printDiagram());

/* ----------------------------------------------------- */
console.log('\n==========================================\n');
/* ----------------------------------------------------- */

const reversed_2_Ex1 = reverseAlternatingKElementSublists2(ex1Node, 3);
console.log(reversed_2_Ex1.printDiagram());
const reverted_2_Ex1 = reverseAlternatingKElementSublists2(reversed_2_Ex1, 3);
console.log(reverted_2_Ex1.printDiagram());

console.log('------');

const reversed_2_Ex2 = reverseAlternatingKElementSublists2(ex1Node, 2);
console.log(reversed_2_Ex2.printDiagram());
const reverted_2_Ex2 = reverseAlternatingKElementSublists2(reversed_2_Ex2, 2);
console.log(reverted_2_Ex2.printDiagram());

console.log('------');

const reversed_2_Ex3 = reverseAlternatingKElementSublists2(ex1Node, 1);
console.log(reversed_2_Ex3.printDiagram());
const reverted_2_Ex3 = reverseAlternatingKElementSublists2(reversed_2_Ex3, 1);
console.log(reverted_2_Ex3.printDiagram());

console.log('------');

const reversed_2_Ex4 = reverseAlternatingKElementSublists2(ex1Node, 6);
console.log(reversed_2_Ex4.printDiagram());
const reverted_2_Ex4 = reverseAlternatingKElementSublists2(reversed_2_Ex4, 6);
console.log(reverted_2_Ex4.printDiagram());

console.log('------');

const reversed_2_Ex5 = reverseAlternatingKElementSublists2(ex1Node, 15);
console.log(reversed_2_Ex5.printDiagram());
const reverted_2_Ex5 = reverseAlternatingKElementSublists2(reversed_2_Ex5, 15);
console.log(reverted_2_Ex5.printDiagram());

console.log('------');

const reversed_2_Ex6 = reverseAlternatingKElementSublists2(ex1Node, 9);
console.log(reversed_2_Ex6.printDiagram());
const reverted_2_Ex6 = reverseAlternatingKElementSublists2(reversed_2_Ex6, 9);
console.log(reverted_2_Ex6.printDiagram());

console.log('------');

const reversed_2_Ex7 = reverseAlternatingKElementSublists2(ex1Node, 8);
console.log(reversed_2_Ex7.printDiagram());
const reverted_2_Ex7 = reverseAlternatingKElementSublists2(reversed_2_Ex7, 8);
console.log(reverted_2_Ex7.printDiagram());

console.log('------');

const reversed_2_Ex8 = reverseAlternatingKElementSublists2(ex2Node, 3);
console.log(reversed_2_Ex8.printDiagram());
const reverted_2_Ex8 = reverseAlternatingKElementSublists2(reversed_2_Ex8, 3);
console.log(reverted_2_Ex8.printDiagram());

console.log('------');

const reversed_2_Ex9 = reverseAlternatingKElementSublists2(ex2Node, 2);
console.log(reversed_2_Ex9.printDiagram());
const reverted_2_Ex9 = reverseAlternatingKElementSublists2(reversed_2_Ex9, 2);
console.log(reverted_2_Ex9.printDiagram());

console.log('------');

const reversed_2_Ex10 = reverseAlternatingKElementSublists2(ex2Node, 4);
console.log(reversed_2_Ex10.printDiagram());
const reverted_2_Ex10 = reverseAlternatingKElementSublists2(reversed_2_Ex10, 4);
console.log(reverted_2_Ex10.printDiagram());

console.log('------');

const reversed_2_Ex11 = reverseAlternatingKElementSublists2(ex2Node, 5);
console.log(reversed_2_Ex11.printDiagram());
const reverted_2_Ex11 = reverseAlternatingKElementSublists2(reversed_2_Ex11, 5);
console.log(reverted_2_Ex11.printDiagram());

console.log('------');

const reversed_2_Ex12 = reverseAlternatingKElementSublists2(ex2Node, 6);
console.log(reversed_2_Ex12.printDiagram());
const reverted_2_Ex12 = reverseAlternatingKElementSublists2(reversed_2_Ex12, 6);
console.log(reverted_2_Ex12.printDiagram());

console.log('------');

const reversed_2_Ex13 = reverseAlternatingKElementSublists2(ex2Node, 7);
console.log(reversed_2_Ex13.printDiagram());
const reverted_2_Ex13 = reverseAlternatingKElementSublists2(reversed_2_Ex13, 7);
console.log(reverted_2_Ex13.printDiagram());
