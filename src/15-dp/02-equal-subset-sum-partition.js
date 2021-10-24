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

  if (sum % 2 !== 0) return false; // can't have two equal sum partition if sum is odd.

  const dp = new Array(arr.length).fill({})
    .map(() => new Object());

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


// #3: Bottom Up
// T: O(n * s) --> Since already visited combinations are returned directly from the dp matrix, we don't do any overlapping operations. We do n * s operations.
// S: O(n * s) --> n * s for the dp matrix.
// where n = input array length, s = total sum of all numbers.

const equalSumPartitionTabular = (arr) => {
  const n = arr.length;
  let sum = 0;
  arr.forEach(num => sum += num);

  if (sum % 2 !== 0) return false;

  sum /= 2;
  const dp = new Array(n).fill([])
  .map(() => new Array(sum + 1).fill(false));

  for (let i = 0; i < n; i++) dp[i][0] = true; // we can always get a required sum of 0 by using an empty set.
  for (let s = 1; s <= sum; s++) dp[0][s] = arr[0] === s; // when we have only one number, we can get the sum s if the single number we have is equal to the required sum. In this case the single number will be the subset to get s.

  // bottom up iteration.
  for (let i = 1; i < n; i++) {
    for (let s = 1; s <= sum; s++) {
      if (dp[i - 1][s]) { // Exclude the number (arr[i]). If we can get the required sum s from the previous subset that doesn't include this number, we know we can get the required sum s by simply NOT including this number.
        dp[i][s] = dp[i - 1][s];
      }
      else { // Include the number (arr[i]). If we can't get the required sum s by excluding this number (by just using a previous subset) we must see if we can get the sum s by including this number. We know we can get the required sum s by including this number if the number is less than or equal to the required sum, the subset that excludes this number is able to get the required sum s minus the included number (s - arr[i]). The logic behind this is: since we must include this number, we are checking if the subset that didn't include this number was able to get the sum that is just short of the current number, so that including this number to that previous subset will have the sum that just adds the current number to the previous subset's required sum.
        if (arr[i] <= s) dp[i][s] = dp[i - 1][s - arr[i]];
      }
    }
  }

  return dp[n - 1][sum];
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

console.log('--------------------');

console.log(equalSumPartitionTabular([1, 4, 2, 5, 3, 1, 2, 2]));
console.log(equalSumPartitionTabular([1, 4, 2, 5, 3, 1, 2, 9]));
console.log(equalSumPartitionTabular([1, 4, 2, 5, 3, 1, 2, 4]));
console.log(equalSumPartitionTabular([1, 4, 2, 5, 3, 1, 2, 8]));
console.log(equalSumPartitionTabular([1, 4, 6, 5]));
console.log(equalSumPartitionTabular([1, 2, 3, 4]));
