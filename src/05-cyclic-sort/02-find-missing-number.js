/* We are given an array containing ‘n’ distinct numbers taken from the range 0 to ‘n’. Since the array has only ‘n’ numbers out of the total ‘n+1’ numbers, find the missing number. */

const swap = require('../../_utils/swap');

// T: O(n) --> n + (n-1) for rearranging the nums array, and another n for re-iterating the nums array to find the missing num index. O(n + (n-1) + n) -> O(n).
// S: O(1)
// where n = input array length.

// This question is very similar to 01-cyclic-sort, except that here, we have a range from 0 to n (vs. 1 to n). This means the array of length n will have one missing number. This means instead of the correct index for nums[i] being nums[i] - 1, it will be nums[i]. Also, because of the missing number, if num[i] = n, it will never be in the right place in the rearranged array - in fact, it will be at the index of the missing number, as all other numbers will be at the correct index. If n is the missing number, then we will go through the entire rearranged array and never find an incorrect index, which means we will return n, or nums.length.


function findMissingNumber(nums) {
  // rearrange the nums array so that each num goes to the correct index. If num[i] = n, it will never be at the correct index, so just skip to the next number.
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i && nums[i] < nums.length) {
      const correctIndex = nums[i];
      swap(i, correctIndex, nums);
    }
  }

  // iterate again through the rearranged nums array. The first index where the num isn't at the correct place will represent the missing number.
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) return i;
  }

  // if all indices have the correct number, the missing number must be n.
  return nums.length;
}


// TEST
console.log(findMissingNumber([4, 0, 3, 1]));
console.log(findMissingNumber([4, 3, 9, 1, 6, 7, 10, 0, 8, 2]));
console.log(findMissingNumber([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(findMissingNumber([1, 2, 3, 4, 0, 5, 6, 7, 8, 9]));
