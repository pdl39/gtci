/* Given an unsorted array containing numbers, find the smallest missing positive number in it. */

const swap = require('../../_utils/swap');

// T: O(n)
// S: O(1)
// where n = length of the input array.

// This question is very similar to 02-find-missing-number, except that here, we are not given any range, meaning the array can contain any number - negatives, 0, and numbers that are out of bounds of the array indices. What we need to do is simply ignore any number that is out of bounds or less than 1 and only swap positive numbers within the range of the array into the correct index, starting with 1 at the first index (0). The first number we encounter in the rearranged array that is in an incorrect index will be the smallest positive missing number.

const findSmallestMissingPositiveNumber = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    // we can skip numbers that are < 1.
    while (nums[i] !== i + 1 && nums[i] > 0) {
      const correctIndex = nums[i] - 1;
      // if the correct index for the number is out of range, it means the number is out or range - skip.
      if (nums[correctIndex] === undefined) break;
      // skip duplicates.
      if (nums[correctIndex] === nums[i]) break;
      swap(i, correctIndex, nums);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    // with the first index of the array to begin with 1, the first number that is not in the correct index will be the smallest positive missing number.
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return nums.length + 1;
};


// TEST
console.log(findSmallestMissingPositiveNumber([9, 0, 3, 5, 1, 2, 7, -9, 0, -7, 5]));
console.log(findSmallestMissingPositiveNumber([-9, 0, -3, -5, -1, 2, -7, -9, 0, -7, 5]));
console.log(findSmallestMissingPositiveNumber([-9, 0, -3, -5, -1, -2, -7, -9, 0, -7, -5]));
console.log(findSmallestMissingPositiveNumber([8, 5, 6, 7, 4, 3, 5, 3, 2, 1]));
console.log(findSmallestMissingPositiveNumber([8, 5, 6, 7, 4, 5, 3, 2, 1]));
console.log(findSmallestMissingPositiveNumber([8, 5, 6, 7, 4, 5, 3, 2, 1, 11, 9]));
console.log(findSmallestMissingPositiveNumber([8, 8, 5, 6, 6, 5, 3, 4, 1, 3, 7]));
console.log(findSmallestMissingPositiveNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 15]));
console.log(findSmallestMissingPositiveNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 16]));
