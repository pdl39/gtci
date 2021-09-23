/* We are given an unsorted array containing ‘n+1’ numbers taken from the range 1 to ‘n’. The array has only one duplicate but it can be repeated multiple times. Find that duplicate number without using any extra space. You are, however, allowed to modify the input array. */

// T: O(n) --> O(n + (n - 1));
// S: O(1)
// where n = length of the input array.

// This question is very similar to 03-find-all-missing-numbers, except that here, we only have one number that will can have many duplicates and we simply need to return this duplicate number as soon as we find it. We know a number is a duplicate when we try to swap and find that the correct index of for the current number already has that number in its place.

const findTheDuplicate = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      const correctIndex = nums[i] - 1;
      if (nums[correctIndex] === nums[i]) {
        return nums[i];
      }
      swap(nums, i, correctIndex);
    }
  }

  return;
};

const swap = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}


// TEST
console.log(findTheDuplicate([5, 1, 2, 1, 4, 3, 6, 1, 7, 1]));
console.log(findTheDuplicate([1, 2, 4, 6, 3, 5, 9, 7, 7, 8, 10, 12, 11]));
console.log(findTheDuplicate([5, 4, 3, 2, 3, 1]));
