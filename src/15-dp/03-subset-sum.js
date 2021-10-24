/* Given a set of positive numbers, determine if a subset exists whose sum is equal to a given number ‘S’.

Example 1:#
Input: {1, 2, 3, 7}, S=6
Output: True
The given set has a subset whose sum is '6': {1, 2, 3}
Example 2:#
Input: {1, 2, 7, 1, 5}, S=10
Output: True
The given set has a subset whose sum is '10': {1, 2, 7}
Example 3:#
Input: {1, 3, 4, 8}, S=6
Output: False
The given set does not have any subset whose sum is equal to '6'. */

// This question is essentially the same as 02-equal-subset-sum-partition, except here, we are directly given the sum value to match instead of deriving it from the total sum of all numbers and dividing it by 2.

// #1: Brute Force
const subsetSumBF = (arr, sum) => {
  return doesSubsetExist(arr, 0, sum);
}

const doesSubsetExist = (arr, currentIdx, targetSum) => {
  if (targetSum === 0) return true;
  if (currentIdx >= arr.length) return false;

  if (arr[currentIdx] <= targetSum) {
    if (doesSubsetExist(arr, currentIdx + 1, targetSum - arr[currentIdx])) {
      return true;
    }
  }

  return doesSubsetExist(arr, currentIdx + 1, targetSum);
}


// TEST
console.log(subsetSumBF([1, 4, 2, 5, 3, 1, 2, 2], 6));
console.log(subsetSumBF([1, 4, 2, 5, 3, 1, 2, 9], 24));
console.log(subsetSumBF([1, 4, 2, 5, 3, 1, 2, 8], 35));
console.log(subsetSumBF([1, 4, 6, 5], 11));
console.log(subsetSumBF([1, 4, 6, 5], 3));
console.log(subsetSumBF([1, 2, 3, 4], 8));
console.log(subsetSumBF([1, 2, 3, 4], 10));
console.log(subsetSumBF([1, 3, 4, 8], 6));
console.log(subsetSumBF([1, 2, 7, 1, 5], 10));

console.log('--------------------');

// console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 2]));
// console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 9]));
// console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 4]));
// console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 8]));
// console.log(subsetSumMemo([1, 4, 6, 5]));
// console.log(subsetSumMemo([1, 2, 3, 4]));

// console.log('--------------------');

// console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 2]));
// console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 9]));
// console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 4]));
// console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 8]));
// console.log(subsetSumTabular([1, 4, 6, 5]));
// console.log(subsetSumTabular([1, 2, 3, 4]));

// console.log('--------------------');

// console.log(subsetSumSet([1, 4, 2, 5, 3, 1, 2, 2]));
// console.log(subsetSumSet([1, 4, 2, 5, 3, 1, 2, 9]));
// console.log(subsetSumSet([1, 4, 2, 5, 3, 1, 2, 4]));
// console.log(subsetSumSet([1, 4, 2, 5, 3, 1, 2, 8]));
// console.log(subsetSumSet([1, 4, 6, 5]));
// console.log(subsetSumSet([1, 2, 3, 4]));
