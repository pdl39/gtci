/* Given an array of numbers sorted in an ascending order, find the ceiling of a given number ‘key’. The ceiling of the ‘key’ will be the smallest element in the given array greater than or equal to the ‘key’.

Write a function to return the index of the ceiling of the ‘key’. If there isn’t any ceiling return -1.

Example 1:

Input: [4, 6, 10], key = 6
Output: 1
Explanation: The smallest number greater than or equal to '6' is '6' having index '1'.
Example 2:

Input: [1, 3, 8, 10, 15], key = 12
Output: 4
Explanation: The smallest number greater than or equal to '12' is '15' having index '4'.
Example 3:

Input: [4, 6, 10], key = 17
Output: -1
Explanation: There is no number greater than or equal to '17' in the given array.
Example 4:

Input: [4, 6, 10], key = -1
Output: 0
Explanation: The smallest number greater than or equal to '-1' is '4' having index '0'. */

// T: O(logn)
// S: O(1)
// where n = input array length.

// #2: simply return the last low index.
const ceilOfANumber2 = (arr, key) => {
  let low = 0, high = arr.length - 1;

  if (!arr.length || arr[high] < key) return -1;

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

  // Since we already ruled out the case where the ceil would NOT exist and we are keep checking whether arr[mid] === key, when we come out of the loop without finding an equal number, we know that the low index will will always point to the first index where the number is > key. The while loop stops running when low === high + 1.
  return low;
}

// #1: keep running count of ceilIndex.
const ceilOfANumber = (arr, key) => {
  let low = 0, high = arr.length - 1;
  let ceilIndex = high;

  if (!arr.length || arr[high] < key) return -1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === key) return mid;
    if (arr[mid] < key) {
      low = mid + 1;
    }
    else {
      ceilIndex = Math.min(mid, ceilIndex);
      high = mid - 1;
    }
  }

  return ceilIndex;
}


// TEST
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 6));
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 23));
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 25));
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 33));
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 0));
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 1));
console.log(ceilOfANumber2([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 3));
console.log(ceilOfANumber2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(ceilOfANumber2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(ceilOfANumber2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], -5));
console.log(ceilOfANumber2([4, 6, 10], 10));
console.log(ceilOfANumber2([1, 2, 3, 4, 5, 6, 7], 5));
console.log(ceilOfANumber2([3], 3));
console.log(ceilOfANumber2([3], 4));
console.log(ceilOfANumber2([3], 1));
console.log(ceilOfANumber2([], 1));

console.log('------------');

console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 6));
console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 23));
console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 25));
console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 33));
console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 0));
console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 1));
console.log(ceilOfANumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26], 3));
console.log(ceilOfANumber([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(ceilOfANumber([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(ceilOfANumber([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], -5));
console.log(ceilOfANumber([4, 6, 10], 10));
console.log(ceilOfANumber([1, 2, 3, 4, 5, 6, 7], 5));
console.log(ceilOfANumber([3], 3));
console.log(ceilOfANumber([3], 4));
console.log(ceilOfANumber([3], 1));
console.log(ceilOfANumber([], 1));
