/* We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’. The array originally contained all the numbers from 1 to ‘n’, but due to a data error, one of the numbers got duplicated which also resulted in one number going missing. Find both these numbers. */

const swap = require('../../_utils/swap');

// T: O(n)
// S: O(1)
// where n = length of the input array.

// This question is very similar to 04-find-the-duplicate, except that here, instead of returning just the number that is duplicated, we return a pair that includes both the number that is duplicated and the missing number. But since we can't guarantee what the missing number is when we first find the duplciate number, we need to finish off rearranging the input array and iterate again to find the number at the incorrect index to return the pari, making this actually more similar to 05-find-all-duplicates.


const findTheCorruptPair = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      const correctIndex = nums[i] - 1;
      if (nums[correctIndex] === nums[i]) break;
      else swap(i, correctIndex, nums);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    // return the pair when we reach the number at an incorrect index.
    if (nums[i] !== i + 1) {
      return [nums[i], i + 1];
    }
  }

  return [-1, -1];
}


// TEST
console.log(findTheCorruptPair([1, 2, 3, 4, 4, 5]));
console.log(findTheCorruptPair([1, 2, 3, 2, 4, 5, 8, 6, 7]));
console.log(findTheCorruptPair([1, 2, 3, 2, 4, 5, 8, 6, 9]));
console.log(findTheCorruptPair([1, 2, 3, 7, 4, 5, 8, 6, 9]));
