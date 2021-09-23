/* We are given an unsorted array containing numbers taken from the range 1 to ‘n’. The array can have duplicates, which means some numbers will be missing. Find all those missing numbers. */

const swap = require('../../_utils/swap');

// T: O(n) --> O(n + (n - 1) + n)
// S: O(n) --> n for the output array. Ignoring the space needed for the output array, it will be O(1).
// where n = length of the input array.

// This question is very similar to 03-find-missing-number, except that here, we can have multiple duplictes (and thus multiple missing numbers) with range of 1 to n, instead of having a range of 0 to n that results in a single missing number. We will follow essentially the same method of first rearranging the array to put the numbers in correct indices and then re-iterate to find the missing numbers.


const findAllMissingNumbers = (nums) => {
  const missingNums = [];

  //
  for (let i = 0; i < nums.length; i++) {
    // If the number at the correct index for the current num[i] already has a correct number (a duplicate), we don't need to swap.
    while (nums[i] !== i + 1 && nums[nums[i] - 1] !== nums[i]) {
      const correctIndex = nums[i] - 1;
      swap(i, correctIndex, nums);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      missingNums.push(i + 1);
    }
  }

  return missingNums;
};


// TEST
console.log(findAllMissingNumbers([2, 3, 1, 8, 2, 3, 5, 1]));
console.log(findAllMissingNumbers([2, 3, 1, 8, 2, 3, 5, 1, 1, 1, 4, 2, 3, 2, 3, 4, 1]));
console.log(findAllMissingNumbers([18, 2, 3, 1, 8, 2, 3, 5, 1, 1, 1, 4, 2, 3, 2, 3, 4, 1, 16]));
