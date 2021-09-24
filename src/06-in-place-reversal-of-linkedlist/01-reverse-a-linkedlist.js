/* Given the head of a Singly LinkedList, reverse the LinkedList. Write a function to return the new head of the reversed LinkedList. */

const Node = require('../../ds/Node');

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.


const reverseLinkedlist = (head) => {
  let prev = null;

  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }

  return prev;
};


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

const reversedEx1Node = reverseLinkedlist(ex1Node);
console.log(reversedEx1Node.printList());
console.log(reversedEx1Node.printDiagram());
const revertedEx1Node = reverseLinkedlist(reversedEx1Node);
console.log(revertedEx1Node.printList());
console.log(revertedEx1Node.printDiagram());

