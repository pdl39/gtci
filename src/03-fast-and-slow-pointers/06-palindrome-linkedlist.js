import Node from "../../ds/Node";

/* Given the head of a Singly LinkedList, write a method to check if the LinkedList is a palindrome or not.

Your algorithm should use constant space and the input LinkedList should be in the original form once the algorithm is finished. The algorithm should have O(N)O(N) time complexity where ‘N’ is the number of nodes in the LinkedList. */

// T: O(n)
// S: O(1)
// where n = # of nodes in the linked list.


const isPalindromicLinkedList = (head) => {
  let slow = head, fast = head;

  // First find the middle node. With fast moving at twice the speed of slow, when fast reaches the end of the linked list, slow will be at the middle node.
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // Save the head of the reversed second half, so that we can use it to revert back later.
  const reversedSecondHalfHead = reverseLinkedlist(slow);

  const isPalindrome = checkPalindrome(head, reversedSecondHalfHead);

  // After we determine if the linked list is a palindrome, we need to revert the reversed second half back to its original state.
  reverseLinkedlist(reversedSecondHalfHead);

  return isPalindrome;
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

const checkPalindrome = (head1, head2) => {
  // head1 is the head of the original linked list.
  // head2 is the head of the reversed second half of the original linked list.
  let current1 = head1, current2 = head2;

  while (current2) {
    if (current1.value !== current2.value) return false;
    current1 = current1.next;
    current2 = current2.next;
  }

  return true;
}


// TEST
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

const ex7Node = new Node(1);
ex7Node.next = new Node(2);
ex7Node.next.next = new Node(4);
ex7Node.next.next.next = new Node(6);
ex7Node.next.next.next.next = new Node(6);
ex7Node.next.next.next.next.next = new Node(4);
ex7Node.next.next.next.next.next.next = new Node(2);
ex7Node.next.next.next.next.next.next.next = new Node(1);

console.log(isPalindromicLinkedList(ex1Node));
console.log(isPalindromicLinkedList(ex2Node));
console.log(isPalindromicLinkedList(ex3Node));
console.log(isPalindromicLinkedList(ex4Node));
console.log(isPalindromicLinkedList(ex5Node));
console.log(isPalindromicLinkedList(ex6Node));
console.log(isPalindromicLinkedList(ex7Node));
