/* We are given an array containing n objects. Each object, when created, was assigned a unique number from the range 1 to n based on their creation sequence. This means that the object with sequence number 3 was created just before the object with sequence number 4.

Write a function to sort the objects in-place on their creation sequence number in O(n)O(n) and without using any extra space. For simplicity, let’s assume we are passed an integer array containing only the sequence numbers, though each number is actually an object.

Ex1.
Input: [3, 1, 5, 4, 2]
Output: [1, 2, 3, 4, 5]

Ex2.
Input: [1, 5, 6, 4, 3, 2]
Output: [1, 2, 3, 4, 5, 6]
*/

const swap = require('../../_utils/swap');

// T: O(n) --> In order to sort the array of length n using the fact that there are exactly one number each from the range 1 to n, we can insert each number at its correct index in the array. In order to do this in place without using extra space, we can first find the number that should go into the index of current iteration and then swap it into the current index, but this would require O(n^2), which is bad. What we can do instead, is swap the number at the current index with the number at the index where the current index should go, repeating this until the current index has the correct number. Doing this will have placed all numbers that have been swapped into the current index at their respective correct positions as we swap. This will reduce our work as we iterate through the array by the number of swaps that have already been done. In the worst case, the total number of swaps needed is n - 1. Adding this to the n iterations of the loop, this results in a time complexity of O(n + (n - 1)), which is asymptotically O(n).
// S: O(1)
// where n = input array length.

const cyclicSort = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      const correctIndex = nums[i] - 1;
      swap(i, correctIndex, nums);
    }
  }
  return nums;
}


// TEST
console.log(cyclicSort([3, 1, 5, 4, 2]));
console.log(cyclicSort([3, 1, 5, 4, 2, 10, 7, 8, 6, 9]));
