/* Given a set of positive numbers, find if we can partition it into two subsets such that the sum of elements in both subsets is equal.

Example 1:

Input: {1, 2, 3, 4}
Output: True
Explanation: The given set can be partitioned into two subsets with equal sum: {1, 4} & {2, 3}
Example 2:

Input: {1, 1, 3, 4, 7}
Output: True
Explanation: The given set can be partitioned into two subsets with equal sum: {1, 3, 4} & {1, 7}
Example 3:

Input: {2, 3, 4, 6}
Output: False
Explanation: The given set cannot be partitioned into two subsets with equal sum. */

// #1: Brute Force
// T: O(2^n) --> 2 nested recursive calls
// S: O(n) --> n for recursive stack.
// where n = input array length.

// If there are to be two subsets of equal sums, it means each subset's sum will be exactly half of the total sum of all numbers. This means this question essentially translates to finding a subset whose sum equals s / 2 where s = total sum of all numbers.

const equalSumPartitionBF = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);

  if (sum % 2 !== 0) return false; // can't have two equal sum partition if sum is odd.
  return canPartition(arr, 0, sum / 2);
}

const canPartition = (arr, currentIdx, sum) => {
  if (currentIdx >= arr.length) return false;
  if (arr[currentIdx] === sum) return true;

  if (arr[currentIdx] < sum) {
    // include the current number, only if it is smaller than the remaining sum.
    if (canPartition(arr, currentIdx + 1, sum - arr[currentIdx])) {
      // if we ever get true, return true immediately.
      return true;
    }
  }
  // skip current number
  return canPartition(arr, currentIdx + 1, sum);
}


// #2: Memoization
// T: O(n * s) --> Since already visited combinations are returned directly from the dp matrix, we don't do any overlapping operations. We do n * s operations.
// S: O(n * s) --> n * s for the dp matrix.
// where n = input array length, s = total sum of all numbers.

const equalSumPartitionMemo = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);

  const dp = new Array(arr.length).fill({})
    .map(() => new Object());

  if (sum % 2 !== 0) return false; // can't have two equal sum partition if sum is odd.
  return canPartitionMemo(arr, 0, sum / 2, dp);
}

const canPartitionMemo = (arr, currentIdx, sum, dp) => {
  if (currentIdx >= arr.length) return false;
  if (arr[currentIdx] === sum) return true;

  if (!dp[currentIdx][sum]) { // Only run recursive calls if the current number & sum combination hasn't yet been computed.
    if (arr[currentIdx] < sum) {
      // include the current number, only if it is smaller than the remaining sum.
      dp[currentIdx][sum] = canPartitionMemo(arr, currentIdx + 1, sum - arr[currentIdx], dp); // save subproblem result.
      if (dp[currentIdx][sum]) {
        // if we ever get true, return true immediately.
        return true;
      }
    }

    // skip current number.
    dp[currentIdx][sum] = canPartitionMemo(arr, currentIdx + 1, sum, dp); // save subproblem result.
  }

  return dp[currentIdx][sum];
}


// TEST
console.log(equalSumPartitionBF([1, 4, 2, 5, 3, 1, 2, 2]));
console.log(equalSumPartitionBF([1, 4, 2, 5, 3, 1, 2, 9]));
console.log(equalSumPartitionBF([1, 4, 2, 5, 3, 1, 2, 4]));
console.log(equalSumPartitionBF([1, 4, 2, 5, 3, 1, 2, 8]));
console.log(equalSumPartitionBF([1, 4, 6, 5]));
console.log(equalSumPartitionBF([1, 2, 3, 4]));

console.log('--------------------');

console.log(equalSumPartitionMemo([1, 4, 2, 5, 3, 1, 2, 2]));
console.log(equalSumPartitionMemo([1, 4, 2, 5, 3, 1, 2, 9]));
console.log(equalSumPartitionMemo([1, 4, 2, 5, 3, 1, 2, 4]));
console.log(equalSumPartitionMemo([1, 4, 2, 5, 3, 1, 2, 8]));
console.log(equalSumPartitionMemo([1, 4, 6, 5]));
console.log(equalSumPartitionMemo([1, 2, 3, 4]));
