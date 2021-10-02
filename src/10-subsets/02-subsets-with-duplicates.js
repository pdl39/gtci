/* Given a set of numbers that might contain duplicates, find all of its distinct subsets. */

// T: O(2^n * n) --> In total, we need operations on the entire subsets that get created, which is 2^n - for each subsequent number from the input array of size n, we get 2 times more subsets vs. previous number, meaning the number of subsets required doubles for each subsequent number. And for each subset, we need to copy the subset, which takes n operations in the worst case. For a duplicate, we will copy only half of the exisitng subsets and the new subsets length will be 1.5 times instead of 2, but still, overall it takes 2^n * n operations.
// S: O(2^n  * n) --> 2^n for the output subsets, and each subset can have up to n numbers in it, so the space required will be 2^n * n.
// where n = # of distinct numbers, or the input array length.

// This question is similar to 01-subsets, but here, we have to consider the fact that since we can have duplicates in the input array, following the exact same approach will result in subsets having duplicates. What we want to do is first, sort the input array so that any duplicates are next to each other, and as we iterate through the array, whenever we come across a duplicate number (different from the previous number), instead of copying and adding to all existing subsets, we will only copy and add to the subsets that were created for the previous (duplicate) number. This will ensure that the subsets will not have any duplicates.

const findAllSubsetsWithDuplicates = (nums) => {
  const sortedNums = nums.sort((a, b) => a  - b);
  const subsets = [[]]; // begin with an empty subset.
  let subsetsStart = 0;
  let subsetsEnd = subsets.length - 1;

  for (let i = 0; i < sortedNums.length; i++) {
    subsetsStart = 0;

    if (i > 0 && sortedNums[i] === sortedNums[i - 1]) { // if it is a duplicate, we will only copy and add to the subsets created for the previous (duplicate) number, so set the start index for the subsets to copy to the previous end index + 1.
      subsetsStart = subsetsEnd + 1;
    }

    subsetsEnd = subsets.length - 1; // update the end index to the current subsets length.

    // add the new number to each of the selected subsets (either all existing subsets or the subsets newly created for the previous number)
    for (let j = subsetsStart; j < subsetsEnd + 1; j++) {
      const subsetsCopy = [...subsets[j]];
      subsetsCopy.push(sortedNums[i]);
      subsets.push(subsetsCopy);
    }
  }

  return subsets;
}


// TEST
const ex1 = [0, 1, 2, 5, 4, 3, 6, 8, 11];
const ex2 = [1, 5, 3, 4, 4, 2, 5, 6, 7, 6, 6, 8, 1];
const ex3 = [1, 2, 2, 3, 5];
const ex1Sol = findAllSubsetsWithDuplicates(ex1);
const ex2Sol = findAllSubsetsWithDuplicates(ex2);
const ex3Sol = findAllSubsetsWithDuplicates(ex3);
console.log(ex1Sol.length);
console.log(ex2Sol.length);
console.log(ex3Sol.length);
