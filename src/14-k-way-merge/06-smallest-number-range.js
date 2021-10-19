/* Given ‘M’ sorted arrays, find the smallest range that includes at least one number from each of the ‘M’ lists.

Example 1:

Input: L1=[1, 5, 8], L2=[4, 12], L3=[7, 8, 10]
Output: [4, 7]
Explanation: The range [4, 7] includes 5 from L1, 4 from L2 and 7 from L3.
Example 2:

Input: L1=[1, 9], L2=[4, 12], L3=[7, 10, 16]
Output: [9, 12]
Explanation: The range [9, 12] includes 9 from L1, 12 from L2 and 10 from L3. */

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogm) --> logm for poll/add operation on the min heap, done in the worst case for all n numbers.
// S: O(m) --> m for the min heap
// where n = total # of elements across all arrays, m = # of sorted arrays

const smallestNumberRange = (arrays) => {
  const minHeap = new Heap((a, b) => a[0] < b[0]);

  let currentMax = -Infinity;
  const minRange = [-Infinity, Infinity];

  arrays.forEach((array, arrayIdx) => { // O(m)
    if (0 in array) {
      minHeap.add([array[0], arrayIdx, 0]); // O(logm)
      currentMax = Math.max(currentMax, array[0]);
    }
  });

  while (minHeap.size === arrays.length) {
    const [number, arrayIdx, numIdx] = minHeap.poll(); // O(logm)
    if ((currentMax - number) < (minRange[1] - minRange[0])) {
      minRange[0] = number;
      minRange[1] = currentMax;
    }

    if (numIdx + 1 in arrays[arrayIdx]) {
      const newNum = arrays[arrayIdx][numIdx + 1];

      minHeap.add([newNum, arrayIdx, numIdx + 1]); // O(logm)
      currentMax = Math.max(currentMax, newNum);
    }
  }

  return minRange;
}


// TEST
const l1 = [2, 3, 5, 6, 7, 9];
const l2 = [1, 4, 5, 8, 11, 15, 18, 21];
const l3 = [7, 12, 33];
const l4 = [6, 10, 11, 25, 30, 31];
const l5 = [25, 30, 31, 32, 35, 36, 38, 38, 39];
const l6 = [1, 5, 8];
const l7 = [4, 12];
const l8 = [7, 8, 10];
const l9 = [1, 9];
const l10 = [7, 10, 16];
console.log(smallestNumberRange([l1, l2, l3]));
console.log(smallestNumberRange([l1, l2, l4]));
console.log(smallestNumberRange([l1, l2, l3, l4, l5]));
console.log(smallestNumberRange([l6, l7, l8]));
console.log(smallestNumberRange([l9, l7, l10]));

