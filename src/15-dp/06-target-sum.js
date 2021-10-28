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
  if (currentIdx === arr.length && targetSum === 0) return 1; // Since we are always including all numbers, but either with a + or a - assigned to it, we can only return 1 when we have looked at a complete subset with all arr.length - 1 numbers included. We can't prematurely return out, as targetSum can be temporarily 0 when the numbers we have currently included cancel each other out, even though we have more numbers to look at.
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

// #3: Tabular
// T: O(n * s)
// S: O(n * s)
// where n = input array length, s = targetSum

/* We are going to use a clever logic to convert this question to a "count the number of subsets that haver sum equal to a target sum".
In this question, we are either assigning a + or a - to each number in the array and find the number of such combinations that sum to a target sum.
--> This is essentially the same as finding the number of combinations subsets where the difference between one subset and another subset equals the target sum.
- Take the following example and one solution subset:
input array: [1, 1, 2, 3]
target sum: 1
one solution subset: [+1, -1, -2, +3] -> 1 - 1 - 2 + 3 = 1
This can be re-written as: (1 + 3) - (1 + 2) = 1
In other words:
- subsetSum1 - subsetSum2 = targetSum
We also know:
- subsetSum1 + subsetSum2 = totalSum
Using these 2 equations, we can derive the following:
=> subsetSum1 - subsetSum2 + subsetSum1 + subsetSum2 = targetSum + totalSum
=> 2 * (subsetSum1) = targetSum + totalSum
=> subsetSum1 = (targetSum + totalSum) / 2
So, essentially we want to find the count of subsets whose sum = (targetSum + totalSum) / 2
*/

const targetSumTabular = (arr, targetSum) => {
  let totalSum = 0;
  arr.forEach(num => totalSum += num);

  // if targetSum + totalSum is an odd number, (targetSum + totalSum) / 2 will be a non-integer value, which means subsetSum1 is also not an integer, which means there is no subset such that the difference between its sum and another subset sum equals the targetSum.
  if ((targetSum + totalSum) % 2 !== 0) return 0;

  const adjustedTarget = Math.floor((targetSum + totalSum) / 2);

  const dp = new Array(arr.length).fill(null)
  .map(() => new Array(adjustedTarget + 1).fill(0));

  for (let i = 0; i < arr.length; i++) dp[i][0] = 1;
  for (let s = 1; s <= adjustedTarget; s++) {
    if (arr[0] === s) dp[0][s] = 1;
  }

  for (let i = 1; i < arr.length; i++) {
    for (let s = 1; s <= adjustedTarget; s++) {
      if (arr[i] > s) {
        dp[i][s] = dp[i - 1][s];
      }
      else {
        dp[i][s] = dp[i - 1][s] + dp[i - 1][s - arr[i]];
      }
    }
  }

  return dp[arr.length - 1][adjustedTarget];
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

console.log('\nTabular');
console.log('----------------------');
console.log(targetSumTabular([1, 1, 2, 3], 4));
console.log(targetSumTabular([1, 1, 2, 3], 1));
console.log(targetSumTabular([1, 2, 7, 1], 9));
console.log(targetSumTabular([1, 2, 7, 1, 5], 12));
console.log(targetSumTabular([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 42));
console.log(targetSumTabular([1, 2, 3, 8, 5, 6, 11, 10], 28));

// console.log('\nTabular 2');
// console.log('----------------------');
// console.log(targetSumTabular2([1, 1, 2, 3], 4));
// console.log(targetSumTabular2([1, 1, 2, 3], 1));
// console.log(targetSumTabular2([1, 2, 7, 1], 9));
// console.log(targetSumTabular2([1, 2, 7, 1, 5], 12));
// console.log(targetSumTabular2([1, 2, 7, 1, 5, 3, 8, 5, 6, 11, 9, 10], 42));
// console.log(targetSumTabular2([1, 2, 3, 8, 5, 6, 11, 10], 28));
