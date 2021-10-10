/* Given an array of numbers which is sorted in ascending order and is rotated ‘k’ times around a pivot, find ‘k’.

You can assume that the array does not have any duplicates.

Example 1:

Input: [10, 15, 1, 3, 8]
Output: 2
Explanation: The array has been rotated 2 times. */

// T: O(logn)
// S: O(1)
// where n = input array length.

const rotationCount = (arr) => {
  let low = 0;
  let high = arr.length - 1;
  const lastEl = arr[high];

  // the first el will be less than the last el only when there is no rotation.
  if (arr[low] < arr[high]) return low;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] > arr[mid + 1]) { // num at mid will only be less than the number to its right only when it is the ending number (num at mid + 1 is the starting el). The index of the starting el also represents the number of rotations.
      return mid + 1;
    }
    else {
      if (arr[mid] < lastEl) { // all numbers to the left of the starting number will be bigger than the last el, so to find the position of the starting number, after which all numbers will be less than the last el, we should look to the left if the current num is less than the last el.
        high = mid;
      }
      else {
        low = mid + 1;
      }
    }
  }

  // After the loop, low === high, and represents the index of the starting number, which also represents the number of rotations.
  return low;
}


// TEST
console.log(rotationCount([7, 9, 11, 13, 14, 15, 2, 3, 5, 6]))
console.log(rotationCount([7, 9, 11, 13, 15, 2, 3, 5, 6]))
console.log(rotationCount([1, 2, 3, 5, 6]))
console.log(rotationCount([11, 15, 2, 3, 6]))
console.log(rotationCount([11, 2, 3, 6]))
console.log(rotationCount([7, 9, 11, 13, 14, 15, 2]))
console.log(rotationCount([7, 9, 2]))
console.log(rotationCount([7, 2]))
console.log(rotationCount([2]))
