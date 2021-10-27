/* You are given a set of positive numbers and a target sum ‘S’. Each number should be assigned either a ‘+’ or ‘-’ sign. We need to find the total ways to assign symbols to make the sum of the numbers equal to the target ‘S’.

Example 1:#
Input: {1, 1, 2, 3}, S=1
Output: 3
Explanation: The given set has '3' ways to make a sum of '1': {+1-1-2+3} & {-1+1-2+3} & {+1+1+2-3}
Example 2:#
Input: {1, 2, 7, 1}, S=9
Output: 2
Explanation: The given set has '2' ways to make a sum of '9': {+1+2+7-1} & {-1+2+7+1} */

// This question is verhy similar to 05-count-of-subset-sums, except that here, instead of either including or exluding a number in a subset, we will always include a number in a subset, but assign either a + or a - to the number when including it so that it will be either added or subtracted in each subset.

// #1: Brute Force
// T: O(2^n) --> 2^n total subset combinations
// S: O(n) --> for recursion stack
// where n = input array length.

const targetSumBF = (arr, targetSum) => {
  return getNumWaysBF(arr, 0, targetSum);
}

const getNumWaysBF = (arr, currentIdx, targetSum) => {
  if (currentIdx === arr.length && targetSum === 0) return 1;
  if (currentIdx >= arr.length) return 0;

  const numWays1 = getNumWaysBF(arr, currentIdx + 1, targetSum - arr[currentIdx]); // assign + to the current number (add it to subset)
  const numWays2 = getNumWaysBF(arr, currentIdx + 1, targetSum + arr[currentIdx]); // assign - to the current number (subtract it from subset)

  return numWays1 + numWays2;
}


// #2: Memoization
// T: O(n * s)
// S: O(n * s)
// where n = input array length, s = targetSum

const targetSumMemo = (arr, targetSum) => {
  const dp = new Array(arr.length).fill(null)
  .map(() => new Object());

  return getNumWaysMemo(arr, 0, 0, targetSum, dp);
}

const getNumWaysMemo = (arr, currentIdx, subsetSum, targetSum, dp) => {
  if (currentIdx === arr.length && subsetSum === targetSum) return 1;
  if (currentIdx >= arr.length) return 0;

  if (subsetSum in dp.values()) return dp[currentIdx][subsetSum];

  const numWays1 = getNumWaysMemo(arr, currentIdx + 1, subsetSum + arr[currentIdx], targetSum, dp);
  const numWays2 = getNumWaysMemo(arr, currentIdx + 1, subsetSum - arr[currentIdx], targetSum, dp);

  dp[currentIdx][subsetSum] = numWays1 + numWays2;
  return dp[currentIdx][subsetSum];
}


// TEST
console.log('\nBrute Force');
console.log('----------------------');
console.log(targetSumBF([1, 1, 2, 3], 4));
console.log(targetSumBF([1, 1, 2, 3], 1));
console.log(targetSumBF([1, 2, 7, 1], 9));
console.log(targetSumBF([1, 2, 7, 1, 5], 12));
console.log(targetSumBF([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 42));
console.log(targetSumBF([1, 2, 3, 8, 5, 6, 11, 10], 28));

console.log('\nMemoization');
console.log('----------------------');
console.log(targetSumMemo([1, 1, 2, 3], 4));
console.log(targetSumMemo([1, 1, 2, 3], 1));
console.log(targetSumMemo([1, 2, 7, 1], 9));
console.log(targetSumMemo([1, 2, 7, 1, 5], 12));
console.log(targetSumMemo([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 42));
console.log(targetSumMemo([1, 2, 3, 8, 5, 6, 11, 10], 28));

// console.log('\nTabular');
// console.log('----------------------');
// console.log(targetSumTabular([1, 1, 2, 3], 4));
// console.log(targetSumTabular([1, 1, 2, 3], 1));
// console.log(targetSumTabular([1, 2, 7, 1], 9));
// console.log(targetSumTabular([1, 2, 7, 1, 5], 12));
// console.log(targetSumTabular([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 42));
// console.log(targetSumTabular([1, 2, 3, 8, 5, 6, 11, 10], 28));

// console.log('\nTabular 2');
// console.log('----------------------');
// console.log(targetSumTabular2([1, 1, 2, 3], 4));
// console.log(targetSumTabular2([1, 1, 2, 3], 1));
// console.log(targetSumTabular2([1, 2, 7, 1], 9));
// console.log(targetSumTabular2([1, 2, 7, 1, 5], 12));
// console.log(targetSumTabular2([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 42));
// console.log(targetSumTabular2([1, 2, 3, 8, 5, 6, 11, 10], 28));
