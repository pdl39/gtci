/* Given the head of a Singly LinkedList, write a function to determine if the LinkedList has a cycle in it or not. */

// T: O(n) --> Once the slow pointer enters the cycle, the fast pointer will meet the slow pointer in the same cycle.
// S: O(1)
// where n = # of nodes in the linked list.

const hasCycle = (head) => {
  let fast = head, slow = head;
  while (fast && fast.next) {
    fast = fast.next.next; // the fast pointer moves by two
    slow = slow.next; // the slow pointer moves by one

    if (slow === fast) { // found a cycle
      return true;
    }
  }
  return false
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

console.log(hasCycle(ex1Node));
console.log(hasCycle(ex2Node));
console.log(hasCycle(ex3Node));
