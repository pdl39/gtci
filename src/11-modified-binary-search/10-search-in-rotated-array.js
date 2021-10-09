/* Given an array of numbers which is sorted in ascending order and also rotated by some arbitrary number, find if a given ‘key’ is present in it.

Write a function to return the index of the ‘key’ in the rotated array. If the ‘key’ is not present, return -1. You can assume that the given array does not have any duplicates.

Example 1:

Input: [10, 15, 1, 3, 8], key = 15
Output: 1
Explanation: '15' is present in the array at index '1'. */

// T; O(logn)
// S: O(1)
// where n = input array length.

const searchInRotatedArr = (arr, key) => {
  let low =  0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = (low + Math.floor((high - low) / 2));

    if (key === arr[mid]) return mid;

    if (arr[low] < arr[mid]) { // we know the left side (low ~ mid) is sorted.
      if (key >= arr[low] && key < arr[mid]) { // if key is in the range (low ~ mid), look at this half.
        high = mid - 1;
      }
      else { // if not in range, look at the right half.
        low = mid + 1;
      }
    }
    else { // we know the right side is sorted
      if (key > arr[mid] && key <= arr[high]) { // if key is in the range (mid ~ high), look at this half.
        low = mid + 1;
      }
      else { // if not in range, look at the left half.
        high = mid - 1;
      }
    }
  }

  return -1;
}


// TEST
console.log(searchInRotatedArr([7, 9, 11, 13, 14, 15, 2, 3, 5, 6], 14))
console.log(searchInRotatedArr([7, 9, 11, 13, 14, 15, 2, 3, 5, 6], 11))
console.log(searchInRotatedArr([7, 9, 11, 13, 14, 15, 2, 3, 6], 11))
console.log(searchInRotatedArr([7, 9, 11, 13, 14, 15, 2, 3, 6], 1))
console.log(searchInRotatedArr([7, 9, 2], 9))
