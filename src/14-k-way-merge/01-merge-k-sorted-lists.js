/* Given an array of ‘K’ sorted LinkedLists, merge them into one sorted list.

Example 1:

Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4]
Output: [1, 2, 3, 3, 4, 6, 6, 7, 8]
Example 2:

Input: L1=[5, 8, 9], L2=[1, 7]
Output: [1, 5, 7, 8, 9] */

const ListNode = require('../../ds/Node');
const Heap = require('../../ds/PriorityQueue');

// T: O(nlogk) --> we tarverse all n elements, but at any time, keep a min heap that contains at most k elements. Each add/poll operation on the min heap thus takes O(logk) time.
// S: O(k) --> k for min heap.
// where n = total # of elements in all lists, k = # of lists

const mergeLists = (lists) => {
  const minHeap = new Heap((a, b) => a.value < b.value);

  lists.forEach(listNode => {
    if (listNode) {
      minHeap.add(listNode);
    }
  });

  let mergedList = null;
  let currentNode = null;

  while (minHeap.size) {
    const current = minHeap.poll();

    if(!mergedList) {
      mergedList = current;
      currentNode = mergedList;
    }
    else {
      currentNode.next = current;
      currentNode = currentNode.next;
    }

    if (current.next) {
      minHeap.add(current.next);
    }
  }

  return mergedList.printList();
}


// TEST
const l1 = new ListNode(2);
l1.next = new ListNode(5);
l1.next.next = new ListNode(7);
l1.next.next.next = new ListNode(8);

const l2 = new ListNode(1);
l2.next = new ListNode(6);
l2.next.next = new ListNode(11);
l2.next.next.next = new ListNode(15);
l2.next.next.next.next = new ListNode(18);

const l3 = new ListNode(4);
l3.next = new ListNode(8);
l3.next.next = new ListNode(19);

console.log(mergeLists([l1, l2, l3]));


