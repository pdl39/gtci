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
// T: O(2^n)
// S: (n) --> for recursion stack
// where n = input array length.
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


// #2: Memoization
// T: O(n * s)
// S: (n * s) --> for dp
// where n = input array length, s = target sum.
const subsetSumMemo = (arr, sum) => {
  const dp = new Array(arr.length).fill(null)
  .map(() => new Object());

  return doesSubsetExistMemo(arr, 0, sum, dp);
}

const doesSubsetExistMemo = (arr, currentIdx, targetSum, dp) => {
  if (targetSum === 0) return true;
  if (currentIdx >= arr.length) return false;

  if (targetSum in dp[currentIdx]) return dp[currentIdx][targetSum]; // return from dp if exists.

  dp[currentIdx][targetSum] = doesSubsetExistMemo(arr, currentIdx + 1, targetSum, dp); // exclude the current number if it is bigger than the target sum or if the subset that included it returned false.

  if (arr[currentIdx] <= targetSum) { // include the number in the subset if it is smaller than or equal to the target sum.
    const subResult = doesSubsetExistMemo(arr, currentIdx + 1, targetSum - arr[currentIdx], dp);
    if (subResult) dp[currentIdx][targetSum] = subResult;
  }

  return dp[currentIdx][targetSum];
}


// #3: Tabular
// T: O(n * s)
// S: O(n * s) --> for dp
// where n = input array length, s = target sum

const subsetSumTabular = (arr, sum) => {
  const n = arr.length;

  const dp = new Array(n).fill(null)
  .map(() => new Array(sum + 1).fill(false)); // All subsets set to false by default.

  for (let i = 0; i < n; i++) dp[i][0] = true; // We can always get target of 0 using empty set.
  for (let s = 0; s <= sum; s++) dp[0][s] = arr[0] === s; // When we have only one number, the only way we can the target is if this number is equal to the target.

  for (let i = 1; i < n; i++) {
    for (let s = 1; s <= sum; s++) {
      if (dp[i - 1][s]) {
        dp[i][s] = dp[i - 1][s] // exclude the number if we can get the target from the previous subset that does NOT include the current number.
      }
      else { // Else we must see if we can get the target by including the current number.
        if (arr[i] <= s) dp[i][s] = dp[i - 1][s - arr[i]];
      }
    }
  }

  return dp[n - 1][sum];
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

console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 2], 6));
console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 9], 24));
console.log(subsetSumMemo([1, 4, 2, 5, 3, 1, 2, 8], 35));
console.log(subsetSumMemo([1, 4, 6, 5], 11));
console.log(subsetSumMemo([1, 4, 6, 5], 3));
console.log(subsetSumMemo([1, 2, 3, 4], 8));
console.log(subsetSumMemo([1, 2, 3, 4], 10));
console.log(subsetSumMemo([1, 3, 4, 8], 6));
console.log(subsetSumMemo([1, 2, 7, 1, 5], 10));

console.log('--------------------');

console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 2], 6));
console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 9], 24));
console.log(subsetSumTabular([1, 4, 2, 5, 3, 1, 2, 8], 35));
console.log(subsetSumTabular([1, 4, 6, 5], 11));
console.log(subsetSumTabular([1, 4, 6, 5], 3));
console.log(subsetSumTabular([1, 2, 3, 4], 8));
console.log(subsetSumTabular([1, 2, 3, 4], 10));
console.log(subsetSumTabular([1, 3, 4, 8], 6));
console.log(subsetSumTabular([1, 2, 7, 1, 5], 10));

console.log('--------------------');

// console.log(subsetSumBF([1, 4, 2, 5, 3, 1, 2, 2], 6));
// console.log(subsetSumBF([1, 4, 2, 5, 3, 1, 2, 9], 24));
// console.log(subsetSumBF([1, 4, 2, 5, 3, 1, 2, 8], 35));
// console.log(subsetSumBF([1, 4, 6, 5], 11));
// console.log(subsetSumBF([1, 4, 6, 5], 3));
// console.log(subsetSumBF([1, 2, 3, 4], 8));
// console.log(subsetSumBF([1, 2, 3, 4], 10));
// console.log(subsetSumBF([1, 3, 4, 8], 6));
// console.log(subsetSumBF([1, 2, 7, 1, 5], 10));
