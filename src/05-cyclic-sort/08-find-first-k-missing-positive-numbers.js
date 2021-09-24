/* Given an unsorted array containing numbers and a number ‘k’, find the first ‘k’ missing positive numbers in the array. */

const swap = require('../../_utils/swap');

// T: O(n + k) --> we also need k operations in the worst case for the last iteration.
// S: O(n) --> n for the output array. Ignoring space needed for the output array, it would be O(1).
// where n = length of the input array.

const findFirstKMissingPositiveNumbers = (nums, k) => {
  const firstKMissingPositiveNums = [];
  const outOfRangeNums = [];

  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1 && nums[i] > 0) {
      const correctIndex = nums[i] - 1;
      // if the number is out of range, add it to a separate array to store them.
      if (nums[correctIndex] === undefined) {
        outOfRangeNums.push(nums[i]);
        break;
      };
      // skip duplicates.
      if (nums[correctIndex] === nums[i]) break;
      swap(i, correctIndex, nums);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (k === 0) break;
    if (nums[i] !== i + 1) {
      firstKMissingPositiveNums.push(i + 1);
      k--;
    }
  }

  // handle the remaining k after iterating throught the array.
  if (k > 0) {
    let nextMissingNum = nums.length + 1;
    const outOfRangeNumsSorted = outOfRangeNums.sort((a, b) => a - b);
    let i = 0;
    while (k > 0) {
      while (i < outOfRangeNumsSorted.length) {
        // we must not include numbers in the array that were in the wrong index because they were out of range, but still should be included due to more numbers being considered by the remaining k.
        let smallestOutOfRangeNum = outOfRangeNumsSorted[i];
        if (smallestOutOfRangeNum === nextMissingNum) {
          i++;
          nextMissingNum++;
        }
      }
      firstKMissingPositiveNums.push(nextMissingNum++);
      k--;
    }
  }

  return firstKMissingPositiveNums;
}


// TEST
console.log(findFirstKMissingPositiveNumbers([9, 0, 3, 5, 1, 2, 7, -9, 0, -7, 5], 3));
console.log(findFirstKMissingPositiveNumbers([-9, 0, -3, -5, -1, 2, -7, -9, 0, -7, 5], 5));
console.log(findFirstKMissingPositiveNumbers([-9, 0, -3, -5, -1, -2, -7, -9, 0, -7, -5], 2));
console.log(findFirstKMissingPositiveNumbers([8, 5, 6, 7, 4, 3, 5, 3, 2, 1], 8));
console.log(findFirstKMissingPositiveNumbers([8, 5, 6, 7, 4, 5, 3, 2, 1], 4));
console.log(findFirstKMissingPositiveNumbers([8, 5, 6, 7, 4, 5, 3, 2, 1, 11, 9], 1));
console.log(findFirstKMissingPositiveNumbers([8, 8, 5, 6, 6, 5, 3, 4, 1, 3, 7], 0));
console.log(findFirstKMissingPositiveNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 15], 10));
console.log(findFirstKMissingPositiveNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 16], 11));
console.log(findFirstKMissingPositiveNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 16, 18, 20, 21, 22], 11));
