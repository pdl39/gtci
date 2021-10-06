/* Given an array of numbers sorted in ascending order, find the range of a given number ‘key’. The range of the ‘key’ will be the first and last position of the ‘key’ in the array.

Write a function to return the range of the ‘key’. If the ‘key’ is not present return [-1, -1].

Example 1:

Input: [4, 6, 6, 6, 9], key = 6
Output: [1, 3]
Example 2:

Input: [1, 3, 8, 10, 15], key = 10
Output: [3, 3]
Example 3:

Input: [1, 3, 8, 10, 15], key = 12
Output: [-1, -1]
*/

// #2: Optimal.
// T: O(logn)
// S: O(1)
// where n = input array length.

const numberRange2 = (arr, key) => {
  const range = [-1, -1];
  range[0] = binarySearch(arr, key, false); // find lowerbound.

  if (range[0] === -1) return range; // if we get -1 from the first binarysearch, it means we don't have a key in the arr, so there is no need to run one more binary search to find the upper bound.
  range[1] = binarySearch(arr, key, true); // find upperbound.

  return range;
}

const binarySearch = (arr, key, isFindUpperBound) => {
  let low = 0, high = arr.length - 1;
  let keyIndex = -1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] < key) {
      low = mid + 1;
    }
    else if (arr[mid] > key) {
      high = mid - 1;
    }
    else { // arr[mid] === key
      // after finding the key, we will continue the binary search to find the upperbound/lowerbound. Every time we find a new key, we will update the keyIndex to the current index of the key.
      keyIndex = mid;
      if (isFindUpperBound) { // case for finding upperbound
        low = mid + 1;
      }
      else { // case for finding lowerbound
        high = mid - 1;
      }
    }
  }

  return keyIndex // will return -1 when we haven't found any number === key.
}


// #1: NOT optimal.
// T: O(n)
// S: O1)
// where n = input array length.

const numberRange = (arr, key) => {
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === key) {
      let lowerBound = mid;
      let upperBound = mid;

      // expand range until the number at each end !== key.
      while (arr[lowerBound - 1] === key) {
        lowerBound--;
      }
      while (arr[upperBound + 1] === key) {
        upperBound++;
      }

      return [lowerBound, upperBound]; // range.
    }

    if (arr[mid] < key) {
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }

  return [-1, -1];
}


// TEST
console.log(numberRange2([1, 2, 3, 4, 5, 5, 6, 7, 8], 5));
console.log(numberRange2([1, 2, 3, 4, 5, 5, 6, 7, 8], 3));
console.log(numberRange2([1, 1, 1, 4, 5, 5, 6, 7, 8, 10], 1));
console.log(numberRange2([1, 1, 1, 4, 5, 5, 6, 7, 8, 10], 10));
console.log(numberRange2([1, 1, 1, 4, 5, 5, 6, 7, 8, 10], 11));
console.log(numberRange2([1, 1, 1, 1], 1));
console.log(numberRange2([1, 1, 1], 1));
console.log(numberRange2([1, 1], 1));
console.log(numberRange2([1], 1));
console.log(numberRange2([], 1));

console.log('---------------');

console.log(numberRange([1, 2, 3, 4, 5, 5, 6, 7, 8], 5));
console.log(numberRange([1, 2, 3, 4, 5, 5, 6, 7, 8], 3));
console.log(numberRange([1, 1, 1, 4, 5, 5, 6, 7, 8, 10], 1));
console.log(numberRange([1, 1, 1, 4, 5, 5, 6, 7, 8, 10], 10));
console.log(numberRange([1, 1, 1, 4, 5, 5, 6, 7, 8, 10], 11));
console.log(numberRange([1, 1, 1, 1], 1));
console.log(numberRange([1, 1, 1], 1));
console.log(numberRange([1, 1], 1));
console.log(numberRange([1], 1));
console.log(numberRange([], 1));
