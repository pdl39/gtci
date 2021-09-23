/* We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’. The array has some numbers appearing twice, find all these duplicate numbers without using any extra space. */

const swap = require('../../_utils/swap');

// T: O(n)
// S: O(n) --> O(n/2) > O(n). n/2 for the output array. Ignoring the space needed for the output array, it will be O(1).
// where n = length of the input array.

// This question is very similar to 03-find-all-missing-numbers, except that here, we return an array of duplicate numbers instead of returning an array of missing numbers. The only difference would be what we add to the output array when we encounter a number that is not in the correct place when we iterate the rearranged nums array - instead of adding index + 1, which represents the missing number, we will add the number at that index, which represents the number that has duplicates.


const findAllDuplicates = (nums) => {
  const duplicates = [];

  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      const correctIndex = nums[i] - 1;
      if (nums[correctIndex] === nums[i]) break;
      else swap(i, correctIndex, nums);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    // any number that is not in the correct index will be a duplicate.
    if (nums[i] !== i + 1) {
      duplicates.push(nums[i]);
    }
  }

  return duplicates;
}


// TEST
console.log(findAllDuplicates([1, 1, 2, 2, 3, 3]));
console.log(findAllDuplicates([3, 4, 1, 2, 1, 5, 5]));
console.log(findAllDuplicates([3, 4, 1, 2, 1, 5, 5, 3, 6, 7, 8, 4]));
console.log(findAllDuplicates([3, 4, 1, 2, 9, 6, 8, 7, 5]));
console.log(findAllDuplicates([3, 4, 1, 2, 9, 9, 6, 8, 7, 5]));
