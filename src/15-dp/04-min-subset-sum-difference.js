/* Given a set of positive numbers, partition the set into two subsets with minimum difference between their subset sums.

Example 1:#
Input: {1, 2, 3, 9}
Output: 3
Explanation: We can partition the given set into two subsets where minimum absolute difference
between the sum of numbers is '3'. Following are the two subsets: {1, 2, 3} & {9}.
Example 2:#
Input: {1, 2, 7, 1, 5}
Output: 0
Explanation: We can partition the given set into two subsets where minimum absolute difference
between the sum of number is '0'. Following are the two subsets: {1, 2, 5} & {7, 1}.
Example 3:#
Input: {1, 3, 100, 4}
Output: 92
Explanation: We can partition the given set into two subsets where minimum absolute difference
between the sum of numbers is '92'. Here are the two subsets: {1, 3, 4} & {100}. */


// #1: Brute Force (my initial solution without looking at the solution).
// T: O(2^n) --> all subset combinations.
// S: O(n) --> for recursion stack
// where n = length of the input array.
const minSubsetSumDiffBF0 = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);
  targetSum = Math.ceil(sum / 2);

  const subsetSum1 = targetSum - findMinDiff0(arr, 0, 0, targetSum);
  const subsetSum2 = sum - subsetSum1;
  return subsetSum2 - subsetSum1;
}

const findMinDiff0 = (arr, currentIdx, subsetSum, targetSum) => {
  if (currentIdx >= arr.length) return targetSum - subsetSum;

  let minDiff1 = targetSum - subsetSum;
  if (subsetSum + arr[currentIdx] <= targetSum) {
    minDiff1 = findMinDiff0(arr, currentIdx + 1, subsetSum + arr[currentIdx], targetSum);
  }
  const minDiff2 = findMinDiff0(arr, currentIdx + 1, subsetSum, targetSum);

  return Math.min(minDiff1, minDiff2);
}

// #2: Brute Force (the solution)
// T: O(2^n) --> all subset combinations.
// S: O(n) --> for recursion stack
// where n = length of the input array.
const minSubsetSumDiffBF = (arr) => {
  return findMinDiff(arr, 0, 0, 0);
}

const findMinDiff = (arr, currentIdx, subsetSum1, subsetSum2) => {
  if (currentIdx >= arr.length) return Math.abs(subsetSum1 - subsetSum2);

  const minDiff1 = findMinDiff(arr, currentIdx + 1, subsetSum1 + arr[currentIdx], subsetSum2);
  const minDiff2 = findMinDiff(arr, currentIdx + 1, subsetSum1, subsetSum2 + arr[currentIdx]);

  return Math.min(minDiff1, minDiff2);
}


// TEST
console.log(minSubsetSumDiffBF0([1, 2, 3, 9]));
console.log(minSubsetSumDiffBF0([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffBF0([1, 3, 100, 4]));

console.log('----------------------');

console.log(minSubsetSumDiffBF([1, 2, 3, 9]));
console.log(minSubsetSumDiffBF([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffBF([1, 3, 100, 4]));
