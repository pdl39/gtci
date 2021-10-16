/* Given an unsorted array of numbers, find the ‘K’ largest numbers in it.

Note: For a detailed discussion about different approaches to solve this problem, take a look at Kth Smallest Number.

Example 1:

Input: [3, 1, 5, 12, 2, 11], K = 3
Output: [5, 12, 11]
Example 2:

Input: [5, 12, 11, -1, 12], K = 3
Output: [12, 11, 12] */

const Heap = require('../../ds/PriorityQueue');

// #2: Optimal solution.
// T: O(nlogk) --> At any point in time, we keep a heap of length k. We go through each number in the input array and perform poll/add operations as needed, which take logk time.
// S: O(k) --> k for the output array, and for the heap.
// where n = input array length, k = number of top numbers to find.

const findTopKNumbers2 = (arr, k) => {
  const topKNums = [];
  const minHeap = new Heap((a, b) => a < b);

  // Add the first k elements to a min heap. The top number will be the smallest number.
  for (let i = 0; i < k; i++) {
    minHeap.add(arr[i]);
  }

  // For each subsequent number, add to the heap if it is bigger than the smallest number in the heap. Remove this smallest number, since we want to keep the 3 biggest numbers in the heap. Any number smaller than the current smallest number will be skipped.
  for (let i = k; i < arr.length; i++) {
    if (arr[i] > minHeap.peek()) {
      minHeap.poll();
      minHeap.add(arr[i]);
    }
  }

  for (let i = 0; i < k; i++) {
    topKNums.push(minHeap.poll());
  }

  return topKNums;
}

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
console.log(findTopKNumbers2([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 3));
console.log(findTopKNumbers2([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 5));

console.log('------------------');

console.log(findTopKNumbers([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 3));
console.log(findTopKNumbers([1, 7, 4, 5, 3, 9, 11, 3, 33, 2, 0, 18, 12, 5, 21, 15], 5));
