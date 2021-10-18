/* Given an N * N matrix where each row and column is sorted in ascending order, find the Kth smallest element in the matrix.

Example 1:

Input: Matrix=[
    [2, 6, 8],
    [3, 7, 10],
    [5, 8, 11]
  ],
  K=5
Output: 7
Explanation: The 5th smallest number in the matrix is 7. */

// T: O(klogn)
// S: O(1)
// where n = matrix dimension on each side (n x n matrix).

const Heap = require('../../ds/PriorityQueue');

// T: O(mlogm + klogm) --> We run through the lists up to m + k times - m times to set up the initial min heap of m elements and k times until we get the kth smallest number - and run add/poll operations - logm - in each iteration.
// S: O(m) --> At any point, the min heap will contain at most m elements, one from each of the m arrays.
// where m = # of sorted arrays, k = kth number to find.

// This quesyion is essentially the same as 02-kth-smallest-number-in-sorted-arrays, given the matrix can be seen as sorted arrays.

const kthSmallestNumber = (matrix, k) => {
  let count = k;
  let currentNum = null;
  const minHeap = new Heap((a, b) => a[0] < b[0]);

  matrix.forEach((row, rowId) => { // O(m)
    if (row[0]) {
      minHeap.add([row[0], rowId, 0]); // O(logm)
    }
  });

  while (minHeap.size && count > 0) { // O(k)
    const [number, rowId, numId] = minHeap.poll(); // O(logm)
    currentNum = number;

    if (matrix[rowId][numId + 1]) {
      minHeap.add([matrix[rowId][numId + 1], rowId, numId + 1]); // O(logm)
    }

    count--;
  }

  return currentNum;
}


// TEST
const matrix1 = [
  [2, 6, 8],
  [3, 7, 10],
  [5, 8, 11]
];

const matrix2 = [
  [1, 7, 16, 28, 55, 88],
  [2, 8, 17, 29, 56, 89],
  [3, 9, 18, 30, 57, 90],
  [4, 10, 19, 31, 58, 91],
  [5, 11, 20, 32, 59, 92],
  [6, 12, 21, 33, 60, 93]
];

const matrix3 = [
  [1, 3, 5, 6],
  [11, 13, 15, 16],
  [21, 23, 25, 26],
  [31, 33, 35, 36]
]

console.log(kthSmallestNumber(matrix1, 5));
console.log(kthSmallestNumber(matrix1, 2));
console.log(kthSmallestNumber(matrix1, 6));
console.log(kthSmallestNumber(matrix2, 1));
console.log(kthSmallestNumber(matrix2, 4));
console.log(kthSmallestNumber(matrix2, 18));
console.log(kthSmallestNumber(matrix2, 19));
console.log(kthSmallestNumber(matrix2, 25));
console.log(kthSmallestNumber(matrix2, 36));
console.log(kthSmallestNumber(matrix3, 5));
console.log(kthSmallestNumber(matrix3, 2));
console.log(kthSmallestNumber(matrix3, 6));
console.log(kthSmallestNumber(matrix3, 16));
