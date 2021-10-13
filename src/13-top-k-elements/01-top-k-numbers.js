/* Given an unsorted array of numbers, find the ‘K’ largest numbers in it.

Note: For a detailed discussion about different approaches to solve this problem, take a look at Kth Smallest Number.

Example 1:

Input: [3, 1, 5, 12, 2, 11], K = 3
Output: [5, 12, 11]
Example 2:

Input: [5, 12, 11, -1, 12], K = 3
Output: [12, 11, 12] */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogn) --> adding a number to the heap is a logn operation, which we do for all numbers for nlogn time. polling is also a logn operation, which, in the worst case where k = n, will also be nlogn time.
// S: O(n) --> n for the heap, k for the output array. k <= n.
// where n = input array length, k = number of top numbers to find.

const findTopKNumbers = (arr, k) => {
  const topKNums = [];
  const maxHeap = new Heap((a, b) => a > b);
  arr.forEach(num => maxHeap.add(num));

  for (let i = 0; i < k; i++) {
    topKNums.push(maxHeap.poll());
  }

  return topKNums;
}


// TEST
console.log(findTopKNumbers([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 3));
console.log(findTopKNumbers([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 5));
