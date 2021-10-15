/* Given an array, find the sum of all numbers between the K1’th and K2’th smallest elements of that array.

Example 1:

Input: [1, 3, 12, 5, 15, 11], and K1=3, K2=6
Output: 23
Explanation: The 3rd smallest number is 5 and 6th smallest number 15. The sum of numbers coming
between 5 and 15 is 23 (11+12).
Example 2:

Input: [3, 5, 8, 7], and K1=1, K2=4
Output: 12
Explanation: The sum of the numbers between the 1st smallest number (3) and the 4th smallest
number (8) is 12 (5+7). */

const Heap = require('../../ds/PriorityQueue');

// T: O(n + klogn) --> n to initiate the min heap from the input array, klogn to go through min heap up to k2 times and poll each time.
// S: O(n) --> n for min heap to store all elements from the array.
// where n = input array length, k = k2

const sumOfElementsBetweenRange = (arr, k1, k2) => {
  const minHeap = new Heap();
  minHeap.build(arr); // O(n)

  for (let i = 0; i < k1; i++) { // O(k1)
    minHeap.poll(); // O(logn)
  }

  let sum = 0;

  for (let i = k1 + 1; i < k2; i++) { // O(k2)
    sum += minHeap.poll(); // O(logn)
  }

  return sum;
}


// TEST
console.log(sumOfElementsBetweenRange([1, 3, 7, 2, 4, 9, 8], 2, 5));
console.log(sumOfElementsBetweenRange([1, 3, 12, 5, 15, 11], 3, 6));
console.log(sumOfElementsBetweenRange([3, 5, 8, 7], 1, 4));
