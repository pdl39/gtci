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


const Heap = require('../../ds/PriorityQueue');

// #1: Using min heap.
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

// #2: Using binary search.
// T: O(nlog(max - min))
// S: O(1)
// where n = # of rows (or columns) in the matrix, max = the biggest number in the matrix, min = the smallest number in the matrix.

const kthSmallestNumber2 = (matrix, k) => {
  const n = matrix.length;
  // instead of doing a binar search on the low/high indices, we will do a binary search on the low/high numbers. When we start off, the range will be from low = the upper left corner number of the matrix, which must be the smallest number of the matrix, and high = the lower right corner number, which must be the biggest number.
  let low = matrix[0][0];
  let high = matrix[n - 1][n - 1];

  while (low < high) {
    // The mid number is NOT necessarily a number in the matrix. I will be used as a reference point to search in the right half.
    const mid = low + Math.floor((high - low) / 2);
    const [count, leftEnd, rightStart] = getCountAndNewBounds(matrix, mid, matrix[0][0], matrix[n - 1][n - 1]);

    if (count === k) return leftEnd;

    if (count < k) {
      low = rightStart;
    }
    else {
      high = leftEnd;
    }
  }

  return low;
}

const getCountAndNewBounds = (matrix, mid, leftEnd, rightStart) => {
  const n = matrix.length;
  let row = n - 1;
  let col = 0;
  let count = 0;

  while (row >= 0 && col < n) {
    // Since we start with the last row (n - 1) at the first index (col = 0), if the number at current position is bigger than mid, we know all other numbers in the current row at col > 0 will also be bigger than mid, so we look at a lower row. When we have reached a row with the number at col = 0 that is less than or equal to mid, we know we should look at other numbers in the current row as we have already looked at all higher rows before coming to the current row, all of whose numbers we know are bigger than mid. We also know that all numbers at col <= current col at any lower rows are all smaller than mid, so when we encounter a number bigger than mid, we can stay at the same col and look at a lower row. row and col will always move in one direction.
    if (matrix[row][col] > mid) {
      rightStart = Math.min(rightStart, matrix[row][col]);
      row--;
    }
    else {
      leftEnd = Math.max(leftEnd, matrix[row][col]);
      col++;
      count += row + 1;
    }
  }

  return [count, leftEnd, rightStart];
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
];

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

console.log('---------------');

console.log(kthSmallestNumber2(matrix1, 5));
console.log(kthSmallestNumber2(matrix1, 2));
console.log(kthSmallestNumber2(matrix1, 6));
console.log(kthSmallestNumber2(matrix2, 1));
console.log(kthSmallestNumber2(matrix2, 4));
console.log(kthSmallestNumber2(matrix2, 18));
console.log(kthSmallestNumber2(matrix2, 19));
console.log(kthSmallestNumber2(matrix2, 25));
console.log(kthSmallestNumber2(matrix2, 36));
console.log(kthSmallestNumber2(matrix3, 5));
console.log(kthSmallestNumber2(matrix3, 2));
console.log(kthSmallestNumber2(matrix3, 6));
console.log(kthSmallestNumber2(matrix3, 16));
