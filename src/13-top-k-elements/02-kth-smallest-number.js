/* Given an unsorted array of numbers, find Kth smallest number in it.

Please note that it is the Kth smallest number in the sorted order, not the Kth distinct element.

Example 1:

Input: [1, 5, 12, 2, 11, 5], K = 3
Output: 5
Explanation: The 3rd smallest number is '5', as the first two smaller numbers are [1, 2].
Example 2:

Input: [1, 5, 12, 2, 11, 5], K = 4
Output: 5
Explanation: The 4th smallest number is '5', as the first three small numbers are [1, 2, 5].
Example 3:

Input: [5, 12, 11, -1, 12], K = 3
Output: 11
Explanation: The 3rd smallest number is '11', as the first two small numbers are [5, -1]. */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogk) --> we iterate through all numbers in the input array, and for each perform poll/add operation as needed, wwhich takes logk time.
// S: O(k) --> we keep max k numbers at a time in the heap.
// where n = input array length, k = kth number to find.

const findKthSmallestNumber = (arr, k) => {
  if (k > arr.length) return null;

  const maxHeap = new Heap((a, b) => a > b);

  for (let i = 0; i < k; i++) {
    maxHeap.add(arr[i]);
  }

  for (let i = k; i < arr.length; i++) {
    if (arr[i] < maxHeap.peek()) {
      maxHeap.poll();
      maxHeap.add(arr[i]);
    }
  }

  return maxHeap.peek();
}


// TEST
console.log(findKthSmallestNumber([1, 7, 4, 5, 3, 9, 11, 3, 3, 3, 3, 3, 33, 2, 1, 1, 0, 18, 12, 5, 21, 15], 3));
console.log(findKthSmallestNumber([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 5));
console.log(findKthSmallestNumber([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 7));
console.log(findKthSmallestNumber([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 8));
console.log(findKthSmallestNumber([1, 1, 15, 15, 15], 4));
console.log(findKthSmallestNumber([1, 15, 15, 1, 1, 1, 1, 1, 15], 5));
