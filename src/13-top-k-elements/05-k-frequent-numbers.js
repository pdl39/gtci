/* Given an unsorted array of numbers, find the top ‘K’ frequently occurring numbers in it.

Example 1:

Input: [1, 3, 5, 12, 11, 12, 11], K = 2
Output: [12, 11]
Explanation: Both '11' and '12' apeared twice.
Example 2:

Input: [5, 12, 11, 3, 11], K = 2
Output: [11, 5] or [11, 12] or [11, 3]
Explanation: Only '11' appeared twice, all other numbers appeared once. */

const Heap = require('../../ds/PriorityQueue');

// T: O(n + klogn) --> n for building frequency map, n for building max heap, klogn for extracting max frequent number from the max heap k times.
// S: O(n) --> n for frequency map, n for max heap, k for the output array.
// where n = input array length, k = # of top frequent numbers to find.

const findTopKFrequentNumbers = (arr, k) => {
  const frequencyMap = {};

  for (let i = 0; i < arr.length; i++) { // O(n)
    if (frequencyMap[arr[i]]) frequencyMap[arr[i]]++;
    else frequencyMap[arr[i]] = 1;
  }

  const kFrequentNumbers = [];

  const maxHeap = new Heap((a, b) => a[1] > b[1]);
  maxHeap.build(Object.entries(frequencyMap)); // O(n)

  for (let i = 0; i < k; i++) { // O(k)
    kFrequentNumbers.push(maxHeap.poll()[0]); // O(logn)
  }

  return kFrequentNumbers;
}


// TEST
console.log(findTopKFrequentNumbers([3, 2, 2, 5, 1, 8, 8, 8, 9, 0], 2));
console.log(findTopKFrequentNumbers([3, 2, 2, 5, 1, 8, 8, 8, 9, 0], 3));
console.log(findTopKFrequentNumbers([3, 2, 2, 5, 1, 8, 8, 8, 9, 9, 0], 3));
console.log(findTopKFrequentNumbers([11, 3, 11, 2, 2, 11, 5, 1, 8, 11, 8, 8, 9, 9, 0], 4));
console.log(findTopKFrequentNumbers([11, 3, 11, 2, 2, 11, 5, 1, 8, 11, 8, 8, 9, 9, 0], 2));
console.log(findTopKFrequentNumbers([11, 3, 2, 11, 2, 2, 11, 5, 1, 8, 11, 8, 2, 8, 9, 9, 0], 2));
