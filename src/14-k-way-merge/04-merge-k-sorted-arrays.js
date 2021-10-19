/* Given a list of ‘K’ sorted arrays, merge them into one sorted list. */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogk) --> We run through all n elements across all input arrays and run add/poll operations - logm - in each iteration.
// S: O(k) --> At any point, the min heap will contain at most k elements, 1 number from each of the k arrays.
// where n = total # of elements across all arrays, k = # of arrays.

// This question is very similar to 01-merge-k-sorted-lists, except that here the inputs are arrays instead of linked lists.

const findKthSmallestNumber = (lists, k) => {
  const mergedArr = [];
  const minHeap = new Heap((a, b) => a[0] < b[0]);

  lists.forEach((list, listId) => { // O(m)
    if (list[0]) {
      minHeap.add([list[0], listId, 0]); // O(logm)
    }
  });

  while (minHeap.size) { // O(n)
    const [number, listId, numId] = minHeap.poll(); // O(logm)
    mergedArr.push(number);

    if (lists[listId][numId + 1]) {
      minHeap.add([lists[listId][numId + 1], listId, numId + 1]); // O(logm)
    }
  }

  return mergedArr;
}


// TEST
const l1 = [2, 3, 5, 6, 7, 9];
const l2 = [1, 4, 5, 8, 11, 15, 18, 21];
const l3 = [7, 12, 33];
const l4 = [6, 10, 11, 25, 30, 31];
const l5 = [25, 30, 31, 32, 35, 36, 38, 38, 39];
console.log(findKthSmallestNumber([l1, l2, l3]));
console.log(findKthSmallestNumber([l1, l2, l4]));
console.log(findKthSmallestNumber([l1, l2, l3, l4, l5]));
