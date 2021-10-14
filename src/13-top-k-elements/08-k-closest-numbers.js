/* Given a sorted number array and two integers ‘K’ and ‘X’, find ‘K’ closest numbers to ‘X’ in the array. Return the numbers in the sorted order. ‘X’ is not necessarily present in the array.

Example 1:

Input: [5, 6, 7, 8, 9], K = 3, X = 7
Output: [6, 7, 8]
Example 2:

Input: [2, 4, 5, 6, 9], K = 3, X = 6
Output: [4, 5, 6]
Example 3:

Input: [2, 4, 5, 6, 9], K = 3, X = 10
Output: [5, 6, 9] */


// T: O(logn + k) --> logn to find the closest number index using binary search, k to get the subarray of k closest numbers by moving two pointers, k to add the subarray of k numbers to the output array.
// S: O(k) --> k for the output array.
// where n = input array length, k = # of numbers to find.

const findKClosestNumbers = (arr, k, x) => {
  const closestNumIdx = binarySearchClosestNumIdx(arr, x); // O(logn)

  let start = closestNumIdx;
  let end = closestNumIdx;

  while (end - start + 1 < k) { // O(k)
    if (start === 0) end++;
    else if (end === arr.length - 1) start--;
    else {
      const diff1 = Math.abs(x - arr[start - 1]);
      const diff2 = Math.abs(x - arr[end + 1]);

      if (diff1 < diff2) start--;
      else end++;
    }
  }

  const kClosestNumbers = [];

  for (let i = start; i < end + 1; i++) { // O(k)
    kClosestNumbers.push(arr[i]);
  }

  return kClosestNumbers;
}

const binarySearchClosestNumIdx = (arr, x) => {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === x) return mid;

    if (arr[mid] < x) {
      low = mid + 1;
    }
    else {
      high = mid;
    }
  }

  return low;
}


// TEST
console.log(findKClosestNumbers([1, 4, 6, 9, 10, 15, 16, 18], 3, 13));
console.log(findKClosestNumbers([1, 4, 6, 9, 10, 15, 16, 18], 4, 13));
console.log(findKClosestNumbers([1, 4, 6, 9, 10, 15, 16, 18], 4, 14));
console.log(findKClosestNumbers([1, 4, 6, 9, 10, 15, 16, 18], 6, 4));
