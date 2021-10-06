/* Given an array of numbers sorted in ascending order, find the floor of a given number ‘key’. The floor of the ‘key’ will be the biggest element in the given array smaller than or equal to the ‘key’

Write a function to return the index of the floor of the ‘key’. If there isn’t a floor, return -1. */

// T: O(logn)
// S: O(1)
// where n = input array length.

const floorOfANumber = (arr, key) => {
  let low = 0, high = arr.length - 1;

  if (!arr.length || arr[low] > key) return -1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === key) return mid;

    if (arr[mid] < key) {
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }
  // When we come out of the loop, high = low - 1. Since we have already ruled out the case where a floor does NOT exist and where an element is equal to key, we know this will the biggest element that is smaller than the key.
  return high;
}

console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 6));
console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 23));
console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 25));
console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 33));
console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 0));
console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 1));
console.log(floorOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 3));
console.log(floorOfANumber([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(floorOfANumber([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(floorOfANumber([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], -5));
console.log(floorOfANumber([4, 6, 10], 10));
console.log(floorOfANumber([1, 2, 3, 4, 5, 6, 7], 5));
console.log(floorOfANumber([3], 3));
console.log(floorOfANumber([3], 4));
console.log(floorOfANumber([3], 1));
console.log(floorOfANumber([], 1));
