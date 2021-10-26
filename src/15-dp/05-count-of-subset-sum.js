/* Given a set of positive numbers, find the total number of subsets whose sum is equal to a given number ‘S’.

Example 1: #
Input: {1, 1, 2, 3}, S=4
Output: 3
The given set has '3' subsets whose sum is '4': {1, 1, 2}, {1, 3}, {1, 3}
Note that we have two similar sets {1, 3}, because we have two '1' in our input.
Example 2: #
Input: {1, 2, 7, 1, 5}, S=9
Output: 3
The given set has '3' subsets whose sum is '9': {2, 7}, {1, 7, 1}, {1, 2, 1, 5} */

// #1: Brute Force
// T: O()
// S: O()
// where n = input array length.

const countSubsetsWithTargetSumBF = (arr, targetSum) => {
  return getCountBF(arr, 0, targetSum);
}

const getCountBF = (arr, currentIdx, targetSum) => {
  if (targetSum === 0) return 1;
  if (currentIdx >= arr.length) return 0;

  const count1 = getCountBF(arr, currentIdx + 1, targetSum - arr[currentIdx]);
  const count2 = getCountBF(arr, currentIdx + 1, targetSum);

  return count1 + count2;
}


// TEST
console.log('\nBrute Force');
console.log('----------------------');
console.log(countSubsetsWithTargetSumBF([1, 1, 2, 3], 4));
console.log(countSubsetsWithTargetSumBF([1, 2, 7, 1, 5], 9));
console.log(countSubsetsWithTargetSumBF([1, 2, 7, 1, 5], 18));
console.log(countSubsetsWithTargetSumBF([1, 2, 7, 1, 5], 16));
console.log(countSubsetsWithTargetSumBF([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 21));
console.log(countSubsetsWithTargetSumBF([1, 2, 3, 8, 5, 6, 11, 10], 25));
