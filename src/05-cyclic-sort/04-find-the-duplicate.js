/* We are given an unsorted array containing ān+1ā numbers taken from the range 1 to ānā. The array has only one duplicate but it can be repeated multiple times. Find that duplicate number without using any extra space. You are, however, allowed to modify the input array. */

const swap = require('../../_utils/swap');

// T: O(n) --> O(n + (n - 1));
// S: O(1)
// where n = length of the input array.

// This question is very similar to 03-find-all-missing-numbers, except that here, we only have one number that will can have many duplicates and we simply need to return this duplicate number as soon as we find it. We know a number is a duplicate when we try to swap and find that the correct index of for the current number already has that number in its place.


const findTheDuplicate = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      const correctIndex = nums[i] - 1;
      if (nums[correctIndex] === nums[i]) return nums[i];
      swap(i, correctIndex, nums);
    }
  }

  return;
};


// TEST
console.log(findTheDuplicate([5, 1, 2, 1, 4, 3, 6, 1, 7, 1]));
console.log(findTheDuplicate([1, 2, 4, 6, 3, 5, 9, 7, 7, 8, 10, 12, 11]));
console.log(findTheDuplicate([5, 4, 3, 2, 3, 1]));
