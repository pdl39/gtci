/* Given the head of a Singly LinkedList, write a method to return the middle node of the LinkedList.

If the total number of nodes in the LinkedList is even, return the second middle node. */

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

// Optimal: single iteration, using fast & slow pointers
// when we run the fast pointer at twice the speed of the slow pointer, when the fast pointer reaches the end of the linked list, the slow pointer will have reached the middle node.
const findMiddleOfLinkedList = (head) => {
  let slow = head, fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  return slow;
}


// Brute force: 2 iterations
const findMiddleOfLinkedList1 = (head) => {
  let current = head;
  let length = 0;

  while (current) {
    current = current.next;
    length++;
  }

  let mid = Math.floor(length / 2);

  current = head;
  while (mid > 0) {
    current = current.next;
    mid--;
  }

  return current;
}


// TEST
class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}

const ex1Node = new Node(1);
ex1Node.next = new Node(2);
ex1Node.next.next = new Node(3);
ex1Node.next.next.next = new Node(4);
ex1Node.next.next.next.next = new Node(5);
ex1Node.next.next.next.next.next = new Node(6);

const ex2Node = new Node(1);
ex2Node.next = new Node(2);
ex2Node.next.next = new Node(3);
ex2Node.next.next.next = new Node(4);
ex2Node.next.next.next.next = new Node(5);

const ex3Node = new Node(1);
ex3Node.next = new Node(2);
ex3Node.next.next = new Node(3);
ex3Node.next.next.next = new Node(4);
ex3Node.next.next.next.next = new Node(5);
ex3Node.next.next.next.next.next = new Node(6);
ex3Node.next.next.next.next.next.next = new Node(7);

console.log(findMiddleOfLinkedList(ex1Node));
console.log(findMiddleOfLinkedList(ex2Node));
console.log(findMiddleOfLinkedList(ex3Node));
console.log(findMiddleOfLinkedList1(ex1Node));
console.log(findMiddleOfLinkedList1(ex2Node));
console.log(findMiddleOfLinkedList1(ex3Node));
