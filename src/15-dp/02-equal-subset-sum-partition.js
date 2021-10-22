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

// T: O(2^n) --> 2 nested recursive calls
// S: O(n) --> n for recursive stack.
// where n = input array length.

const equalSumPartition = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);

  if (sum % 2 !== 0) return false; // can't have two equal sum partition if sum is odd.
  return canPartition(arr, 0, sum / 2);
}

const canPartition = (arr, currentIdx, sum) => {
  console.log(arr[currentIdx], 'sum: ', sum);
  if (currentIdx >= arr.length) return false;
  if (arr[currentIdx] === sum) return true;

  if (arr[currentIdx] < sum) {
    if (canPartition(arr, currentIdx + 1, sum - arr[currentIdx])) {
      return true;
    }
  }
  return canPartition(arr, currentIdx + 1, sum);
}


// TEST
console.log(equalSumPartition([1, 4, 2, 5, 3, 1, 2, 2]));
console.log(equalSumPartition([1, 4, 2, 5, 3, 1, 2, 9]));
console.log(equalSumPartition([1, 4, 2, 5, 3, 1, 2, 4]));
console.log(equalSumPartition([1, 4, 2, 5, 3, 1, 2, 8]));
console.log(equalSumPartition([1, 4, 6, 5]));
console.log(equalSumPartition([1, 2, 3, 4]));
