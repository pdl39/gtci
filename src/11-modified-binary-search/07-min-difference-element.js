/* Given an array of numbers sorted in ascending order, find the element in the array that has the minimum difference with the given ‘key’.

Example 1:

Input: [4, 6, 10], key = 7
Output: 6
Explanation: The difference between the key '7' and '6' is minimum than any other number in the array
Example 2:

Input: [4, 6, 10], key = 4
Output: 4
Example 3:

Input: [1, 3, 8, 10, 15], key = 12
Output: 10
Example 4:

Input: [4, 6, 10], key = 17
Output: 10 */


// T: O(logn)
// S: O(1)
// where n = input array length;

// #2: return the min of diff between the key and the last start || end.

const minDiffElement2 = (arr, key) => {
  let low = 0;
  let high = arr.length - 1;

  if (key < arr[low]) return arr[low];
  if (key > arr[high]) return arr[high];

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (key === arr[mid]) return arr[mid];

    if (key < arr[mid]) {
      high = mid - 1;
    }
    else {
      low = mid + 1;
    }
  }

  // After we come out of the loop, low === high + 1. Either low or high will have the closest element to the key.
  return arr[low] - key < key - arr[high] ? arr[low] : arr[high];
}

// #1: keep running count of minDiff & result element.
const minDiffElement = (arr, key) => {
  let low = 0;
  let high = arr.length - 1;

  let minDiff = Infinity;
  let result;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (key === arr[mid]) return arr[mid];

    const diff = Math.abs(key - arr[mid]);
    if (diff < minDiff) {
      minDiff = diff;
      result = arr[mid];
    }

    if (key < arr[mid]) {
      high = mid - 1;
    }
    else {
      low = mid + 1;
    }
  }

  return result;
}


// TEST
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 6));
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 23));
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 25));
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 33));
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 0));
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 1));
console.log(minDiffElement2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 3));
console.log(minDiffElement2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(minDiffElement2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(minDiffElement2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], -5));
console.log(minDiffElement2([4, 6, 10], 9));
console.log(minDiffElement2([1, 2, 3, 4, 5, 6, 7], 0));
console.log(minDiffElement2([3], 3));
console.log(minDiffElement2([3], 4));
console.log(minDiffElement2([3], 1));
console.log(minDiffElement2([], 1));

console.log('--------------');

console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 6));
console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 23));
console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 25));
console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 33));
console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 0));
console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 1));
console.log(minDiffElement([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 3));
console.log(minDiffElement([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(minDiffElement([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(minDiffElement([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], -5));
console.log(minDiffElement([4, 6, 10], 9));
console.log(minDiffElement([1, 2, 3, 4, 5, 6, 7], 0));
console.log(minDiffElement([3], 3));
console.log(minDiffElement([3], 4));
console.log(minDiffElement([3], 1));
console.log(minDiffElement([], 1));
