/* Given ‘M’ sorted arrays, find the median number among all arrays. */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogm) --> We run through the lists up to k = n/2 times and run add/poll operations - logm - in each iteration. Since k = n/2, it is asymptotically n * logm.
// S: O(m) --> At any point, the min heap will contain at most m elements, 1 number from each of the m lists.
// where m = # of lists, k = kth number to find.

// his question is essentially the same as 02-kth-smallest-number-in-m-sorted-array, except that k = n / 2.

const findKthSmallestNumber = (lists) => {
  let n = 0;
  let currentNum = null;
  const minHeap = new Heap((a, b) => a[0] < b[0]);

  lists.forEach((list, listId) => { // O(m)
    n += list.length;
    if (list[0]) {
      minHeap.add([list[0], listId, 0]); // O(logm)
    }
  });

  let count = Math.floor(n / 2);

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
const l4 = [6, 10, 11, 25, 30, 31];
const l5 = [25, 30, 31, 32, 35, 36, 38, 38, 39];
console.log(findKthSmallestNumber([l1, l2, l3]));
console.log(findKthSmallestNumber([l1, l2, l4]));
console.log(findKthSmallestNumber([l1, l2, l3, l4, l5]));
