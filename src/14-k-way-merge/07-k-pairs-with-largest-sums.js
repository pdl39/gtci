/* Given two sorted arrays in descending order, find ‘K’ pairs with the largest sum where each pair consists of numbers from both the arrays.

Example 1:

Input: L1=[9, 8, 2], L2=[6, 3, 1], K=3
Output: [9, 3], [9, 6], [8, 6]
Explanation: These 3 pairs have the largest sum. No other pair has a sum larger than any of these.
Example 2:

Input: L1=[5, 2, 1], L2=[2, -1], K=3
Output: [5, 2], [5, -1], [2, 2]  */

const Heap = require('../../ds/PriorityQueue');

// T: O(n * m * logk) --> we need to look at all pairs (n*m) and for each pair do add/poll operations ass needed. If we assume both arr1 and arr2 will have at least k elements, the time complexity will be O(k^2 * logk)
// S: O(k) --> k for the heap, k for the output array.
// where n = arr1 length, m = arr2 length, k = # of pairs to find.

const kPairsWithLargestSum = (arr1, arr2, k) => {
  const minHeap = new Heap((a, b) => a[0] + a[1] < b[0] + b[1]);

  for (let i = 0; i < Math.min(k, arr1.length); i++) {
    for (let j = 0; j < Math.min(k, arr2.length); j++) {
      if (minHeap.size < k) {
        minHeap.add([arr1[i], arr2[j]]);
      }
      else {
        if (arr1[i] + arr2[j] < minHeap.peek()[0] + minHeap.peek()[1]) {
          break;
        }
        else {
          minHeap.poll();
          minHeap.add([arr1[i], arr2[j]]);
        }
      }
    }
  }

  const kPairs = new Array(k);
  for (let i = k - 1; i >= 0; i--) {
    kPairs[i] = minHeap.poll();
  }

  return kPairs;
}


// TEST
const l1 = [25, 19, 8, 6, 4, 3, 1];
const l2 = [15, 11, 10, 9, 8, 7, 6, 5, 4, 3];

console.log(kPairsWithLargestSum(l1, l2, 5));
