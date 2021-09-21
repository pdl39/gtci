import Node from "../../ds/Node";

/* Given the head of a Singly LinkedList, write a method to modify the LinkedList such that the nodes from the second half of the LinkedList are inserted alternately to the nodes from the first half in reverse order. So if the LinkedList has nodes 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null, your method should return 1 -> 6 -> 2 -> 5 -> 3 -> 4 -> null.

Your algorithm should not use any extra space and the input LinkedList should be modified in-place. */

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.

const rearrangeLinkedList = (head) => {
  let slow = head, fast = head;

  // First find the middle node. With fast moving at twice the speed of slow, when fast reaches the end of the linked list, slow will be at the middle node.
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  const reversedSecondHalfHead = reverseLinkedlist(slow);
  return rearrange(head, reversedSecondHalfHead);
};

const reverseLinkedlist = (head) => {
  let prev = null;

  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }

  return prev;
}

const rearrange = (head1, head2) => {
  // head1 is the head of the original linked list (first half).
  // head2 is the head of the reversed second half of the original linked list.
  let current1 = head1, current2 = head2;

  while (current1 && current2) {
    const temp1 = current1.next;
    const temp2 = current2.next;
    current1.next = current2;
    // when # of nodes are even, the reversed second half will reach null first while the first half still has one node left, which is the same node as the last node of the reversed second half, so we need to make sure we don't set next of the last node of the reversed second half to itself.
    current2.next = current2 !== temp1 ? temp1 : null;
    current1 = temp1;
    current2 = temp2;
  }

  return head1;
}


// TEST
const printLinkedList = (head) => {
  let current = head;
  const arr = [];

  while (current) {
    arr.push(current.value);
    current = current.next;
  }

  return arr;
}

const ex1Node = new Node(1);
ex1Node.next = new Node(2);
ex1Node.next.next = new Node(3);
ex1Node.next.next.next = new Node(4);
ex1Node.next.next.next.next = new Node(3);
ex1Node.next.next.next.next.next = new Node(2);
ex1Node.next.next.next.next.next.next = new Node(1);

const ex2Node = new Node(0);
ex2Node.next = new Node(2);
ex2Node.next.next = new Node(3);
ex2Node.next.next.next = new Node(3);
ex2Node.next.next.next.next = new Node(2);
ex2Node.next.next.next.next.next = new Node(0);

const ex3Node = new Node(1);
ex3Node.next = new Node(2);
ex3Node.next.next = new Node(3);
ex3Node.next.next.next = new Node(3);
ex3Node.next.next.next.next = new Node(2);
ex3Node.next.next.next.next.next = new Node(2);

const ex4Node = new Node(1);
ex4Node.next = new Node(2);
ex4Node.next.next = new Node(3);
ex4Node.next.next.next = new Node(3);
ex4Node.next.next.next.next = new Node(2);

const ex5Node = new Node(3);
ex5Node.next = new Node(3);
ex5Node.next.next = new Node(5);
ex5Node.next.next.next = new Node(7);
ex5Node.next.next.next.next = new Node(9);
ex5Node.next.next.next.next.next = new Node(7);
ex5Node.next.next.next.next.next.next = new Node(5);
ex5Node.next.next.next.next.next.next.next = new Node(3);
ex5Node.next.next.next.next.next.next.next.next = new Node(3);

const ex6Node = new Node(1);
ex6Node.next = new Node(2);
ex6Node.next.next = new Node(4);
ex6Node.next.next.next = new Node(7);
ex6Node.next.next.next.next = new Node(6);
ex6Node.next.next.next.next.next = new Node(4);
ex6Node.next.next.next.next.next.next = new Node(2);
ex6Node.next.next.next.next.next.next.next = new Node(1);

rearrangeLinkedList(ex1Node);
console.log(printLinkedList(ex1Node));
rearrangeLinkedList(ex2Node);
console.log(printLinkedList(ex2Node));
rearrangeLinkedList(ex3Node);
console.log(printLinkedList(ex3Node));
rearrangeLinkedList(ex4Node);
console.log(printLinkedList(ex4Node));
rearrangeLinkedList(ex5Node);
console.log(printLinkedList(ex5Node));
rearrangeLinkedList(ex6Node);
console.log(printLinkedList(ex6Node));
