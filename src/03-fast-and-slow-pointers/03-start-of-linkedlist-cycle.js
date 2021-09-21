import Node from "../../ds/Node";

/* Given the head of a Singly LinkedList that contains a cycle, write a function to find the starting node of the cycle. */

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

// This question extends from 02-linkedlist-cycle-length, since we can find the start of the cycle as long as we know the length of the cycle. When we have the length (k) of the cycle, we can set 2 pointers, one at the beginning of the linked list (head) and another at k after the head (k+1th node). When we have two pointers apart by the length of the cycle, if we continue incrementing both pointers by 1, we will come to a point where they meet, which will be the start of the cycle (if the head is the start of the cycle, k+1th node will be the head).

const findCycleStart = (head) => {
  let slow = head, fast = head;
  let cycleLength = 0;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if (slow === fast) {
      cycleLength = getCycleLength(slow);
      break;
    }
  }

  return findCycleStartHelper(head, cycleLength);
};

const getCycleLength = (slow) => {
  let current = slow;
  let cycleLength = 0;

  while (current) {
    current = current.next;
    cycleLength++;
    if (current === slow) break;
  }

  return cycleLength;
}

const findCycleStartHelper = (head, cycleLength) => {
  let p1 = head, p2 = head;

  // move p2 ahead by the length of the cycle.
  for (let i = 0; i < cycleLength; i++) {
    p2 = p2.next;
  }

  // increment p1 and p2 by one until they meet.
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  // when p1 and p2 meet, this is the start of the cycle.
  return p1;
}


// TEST
const ex1Node = new Node(1);
ex1Node.next = new Node(2);
ex1Node.next.next = new Node(3);
ex1Node.next.next.next = new Node(4);
ex1Node.next.next.next.next = new Node(5);
ex1Node.next.next.next.next.next = new Node(6);
ex1Node.next.next.next.next.next.next = ex1Node.next.next.next.next;

const ex2Node = new Node(1);
ex2Node.next = new Node(2);
ex2Node.next.next = new Node(3);
ex2Node.next.next.next = new Node(4);
ex2Node.next.next.next.next = new Node(5);
ex2Node.next.next.next.next.next = ex2Node.next;

const ex3Node = new Node(1);
ex3Node.next = new Node(2);
ex3Node.next.next = new Node(3);
ex3Node.next.next.next = new Node(4);
ex3Node.next.next.next.next = new Node(5);
ex3Node.next.next.next.next.next = ex3Node;

console.log(findCycleStart(ex1Node));
console.log(findCycleStart(ex2Node));
console.log(findCycleStart(ex3Node));
