import Node from "../../ds/Node";

/* Given the head of a LinkedList with a cycle, find the length of the cycle. */

// T: O(n) --> we will do one more iteration of the cycle to get the cycle length, but this is just O(2n) -> O(n).
// S: O(1)
// where n = # of nodes in the linked list.

// This question is very similar to 01-linkedlist-cycle, except that instead of return true/false of whether a cycle exists, we will return the length of the cycle after finding a cycle. To find the length of the cycle, we need to do one more iteration after finding the cycle. Using the current slow pointer, we will iterate until we are back to this same point, incrementing the count as we go. If no cycle exists, we will return length of 0.

const cycleLength = (head) => {
  let fast = head, slow = head;
  while (fast && fast.next) {
    fast = fast.next.next; // the fast pointer moves by two
    slow = slow.next; // the slow pointer moves by one

    if (slow === fast) { // found a cycle
      return getCycleLength(slow);
    }
  }
  return 0;
}

const getCycleLength = (slow) => {
  let current = slow;
  let lengthCount = 0;

  while (current) {
    current = current.next;
    lengthCount++;

    if (current === slow) break;
  }

  return lengthCount;
}


// TEST
const ex1Node = new Node(1);
ex1Node.next = new Node(2);
ex1Node.next.next = new Node(3);
ex1Node.next.next.next = new Node(4);
ex1Node.next.next.next.next = new Node(5);
ex1Node.next.next.next.next.next = new Node(2);

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

console.log(cycleLength(ex1Node));
console.log(cycleLength(ex2Node));
console.log(cycleLength(ex3Node));
