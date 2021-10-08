/* Given a Bitonic array, find if a given ‘key’ is present in it. An array is considered bitonic if it is monotonically increasing and then monotonically decreasing. Monotonically increasing or decreasing means that for any index i in the array arr[i] != arr[i+1].

Write a function to return the index of the ‘key’. If the ‘key’ is not present, return -1.

Example 1:

Input: [1, 3, 8, 4, 3], key=4
Output: 3
Example 2:

Input: [3, 8, 3, 1], key=8
Output: 1
Example 3:

Input: [1, 3, 8, 12], key=12
Output: 3
Example 4:

Input: [10, 9, 8], key=10
Output: 0 */

// T: O(logn)
// S: O(1)
// where n = input array length.


const searchBitonicArr = (arr, key) => {
  const [arrMax, maxIdx] = findBitonicArrMax(arr);

  let low = 0;
  let high = maxIdx;

  const ascendingSearchResult = binarySearch(arr, key, true, low, high);
  if (ascendingSearchResult !== -1) {
    return ascendingSearchResult;
  }
  return binarySearch(arr, key, false, maxIdx + 1, arr.length - 1);
}

const findBitonicArrMax = (arr) => {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] < arr[mid + 1]) { // increasing -> the max will be to the right of mid.
      low = mid + 1;
    }
    else { // decreasing phase -> the max is either the mid el or to the left of mid.
      high = mid;
    }
  }
  // After we come out of the loop, low === high.
  return [arr[low], low];
}

const binarySearch = (arr, key, isAscending, low, high) => {
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === key) return mid;

    if (isAscending && arr[mid] < key || !isAscending && arr[mid] < key) {
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }
  // After we come out of the loop, low === high.
  return -1;
}


// TEST
console.log(searchBitonicArr([1, 2, 3, 5, 7, 8, 11, 10, 3], 8));
console.log(searchBitonicArr([1, 3, 5, 7, 8, 11, 10, 3], 3));
console.log(searchBitonicArr([1, 3, 5, 7, 8, 11, 10, 3], 9));
