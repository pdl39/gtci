/* Given ‘M’ sorted arrays, find the K’th smallest number among all the arrays.

Example 1:

Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5
Output: 4
Explanation: The 5th smallest number among all the arrays is 4, this can be verified from
the merged list of all the arrays: [1, 2, 3, 3, 4, 6, 6, 7, 8]
Example 2:

Input: L1=[5, 8, 9], L2=[1, 7], K=3
Output: 7
Explanation: The 3rd smallest number among all the arrays is 7. */

const Heap = require('../../ds/PriorityQueue');

// T: O(mlogm + klogm) --> We run through the lists up to m + k times - m times to set up the initial min heap of m elements and k times until we get the kth smallest number - and run add/poll operations - logm - in each iteration.
// S: O(m) --> At any point, the min heap will contain at most m elements, 1 number from each of the m lists.
// where m = # of lists, k = kth number to find.

const findKthSmallestNumber = (lists, k) => {
  let count = k;
  let currentNum = null;
  const minHeap = new Heap((a, b) => a[0] < b[0]);

  lists.forEach((list, listId) => { // O(m)
    if (list[0]) {
      minHeap.add([list[0], listId, 0]); // O(logm)
    }
  });

  while (minHeap.size && count > 0) { // O(k)
    const [number, listId, numId] = minHeap.poll(); // O(logm)
    currentNum = number;

    if (lists[listId][numId + 1]) {
      minHeap.add([lists[listId][numId + 1], listId, numId + 1]); // O(logm)
    }

    count--;
  }

  return currentNum;
}


// TEST
const l1 = [2, 3, 5, 6, 7, 9];
const l2 = [1, 4, 5, 8, 11, 15, 18, 21];
const l3 = [7, 12, 33];
console.log(findKthSmallestNumber([l1, l2, l3], 6));
console.log(findKthSmallestNumber([l1, l2, l3], 3));
console.log(findKthSmallestNumber([l1, l2, l3], 9));
console.log(findKthSmallestNumber([l1, l2, l3], 15));
