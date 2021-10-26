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


// #1-0: Brute Force (my initial solution without looking at the solution).
// T: O(2^n) --> all subset combinations.
// S: O(n) --> for recursion stack
// where n = length of the input array.
const minSubsetSumDiffBF0 = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);
  targetSum = Math.ceil(sum / 2);
  // Our goal will be to find the subset sum (less than or equal to the target sum) that is closest to the target sum, as if there exists a subset where its sum is equal to the target sum, it means there is another subset with the same sum and their difference will be 0, which will be the absolute minimum.
  // The sum closest to the target sum will be the sum of the first subset, and the other subset will then be the one with sum = total sum - sum of the first subset.
  // Our answer will be the difference between these two subsets.

  const subsetSum1 = targetSum - findMinDiffBF0(arr, 0, 0, targetSum);
  const subsetSum2 = sum - subsetSum1;
  console.log({subsetSum1, subsetSum2});
  return subsetSum2 - subsetSum1;
}

const findMinDiffBF0 = (arr, currentIdx, subsetSum, targetSum) => {
  if (currentIdx >= arr.length) return targetSum - subsetSum;

  let minDiff1 = targetSum - subsetSum;
  if (subsetSum + arr[currentIdx] <= targetSum) {
    minDiff1 = findMinDiffBF0(arr, currentIdx + 1, subsetSum + arr[currentIdx], targetSum);
  }
  const minDiff2 = findMinDiffBF0(arr, currentIdx + 1, subsetSum, targetSum);

  return Math.min(minDiff1, minDiff2);
}

// #1-1: Brute Force (the solution)
// T: O(2^n) --> all subset combinations.
// S: O(n) --> for recursion stack
// where n = length of the input array.
const minSubsetSumDiffBF = (arr) => {
  return findMinDiffBF(arr, 0, 0, 0);
}

const findMinDiffBF = (arr, currentIdx, subsetSum1, subsetSum2) => {
  if (currentIdx >= arr.length) return Math.abs(subsetSum1 - subsetSum2);

  const minDiff1 = findMinDiffBF(arr, currentIdx + 1, subsetSum1 + arr[currentIdx], subsetSum2); // min diff from subsets that include the current number.
  const minDiff2 = findMinDiffBF(arr, currentIdx + 1, subsetSum1, subsetSum2 + arr[currentIdx]); // min diff from subsets that exclude the current number.

  return Math.min(minDiff1, minDiff2);
}


// #2-0: Memoization
// T: O(n * s)
// S: O(n * s)
// where n = input array length, s = total sum of all numbers / 2.

const minSubsetSumDiffMemo0 = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);
  const targetSum = sum / 2;
  // Our goal will be to find the subset sum (less than or equal to the target sum) that is closest to the target sum, as if there exists a subset where its sum is equal to the target sum, it means there is another subset with the same sum and their difference will be 0, which will be the absolute minimum.
  // The sum closest to the target sum will be the sum of the first subset, and the other subset will then be the one with sum = total sum - sum of the first subset.
  // Our answer will be the difference between these two subsets.

  const dp = new Array(arr.length).fill(null)
  .map(() => new Object());

  const minDiff =  findMinDiffMemo0(arr, 0, 0, targetSum, dp);
  const subsetSum1 = targetSum - minDiff;
  const subsetSum2 = sum - subsetSum1;
  console.log({subsetSum1, subsetSum2});
  return subsetSum2 - subsetSum1;
}

const findMinDiffMemo0 = (arr, currentIdx, subsetSum, targetSum, dp) => {
  if (currentIdx >= arr.length) return targetSum - subsetSum;

  if (subsetSum in dp[currentIdx]) return dp[currentIdx][subsetSum];

  let minDiff1 = targetSum - subsetSum;
  if (subsetSum + arr[currentIdx] <= targetSum) {
    minDiff1 = findMinDiffMemo0(arr, currentIdx + 1, subsetSum + arr[currentIdx], targetSum, dp);
  }
  const minDiff2 = findMinDiffMemo0(arr, currentIdx + 1, subsetSum, targetSum, dp);

  dp[currentIdx][subsetSum] = Math.min(minDiff1, minDiff2);
  return dp[currentIdx][subsetSum];
}

// #2-1: Memoization 2
// T: O(n * s)
// S: O(n * s)
// where n = input array length, s = total sum of all numbers / 2.

const minSubsetSumDiffMemo = (arr) => {
  const dp = new Array(arr.length).fill(null)
  .map(() => new Object());

  return findMinDiffMemo(arr, 0, 0, 0, dp);
}

const findMinDiffMemo = (arr, currentIdx, subsetSum1, subsetSum2, dp) => {
  if (currentIdx >= arr.length) return Math.abs(subsetSum1 - subsetSum2);

  if (subsetSum1 in dp[currentIdx]) return dp[currentIdx][subsetSum1];

  const minDiff1 = findMinDiffMemo(arr, currentIdx + 1, subsetSum1 + arr[currentIdx], subsetSum2, dp);
  const minDiff2 = findMinDiffMemo(arr, currentIdx + 1, subsetSum1, subsetSum2 + arr[currentIdx], dp);

  dp[currentIdx][subsetSum1] = Math.min(minDiff1, minDiff2);
  return dp[currentIdx][subsetSum1];
}


// #3-0: Tabular
// T: O(n * s)
// S: O(n * s)
// where n = input array length, s = total sum of all numbers / 2.

const minSubsetSumDiffTabular0 = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);
  const targetSum = Math.floor(sum / 2);
  // Our goal will be to find the subset sum (less than or equal to the target sum) that is closest to the target sum, as if there exists a subset where its sum is equal to the target sum, it means there is another subset with the same sum and their difference will be 0, which will be the absolute minimum.
  // The sum closest to the target sum will be the sum of the first subset, and the other subset will then be the one with sum = total sum - sum of the first subset.
  // Our answer will be the difference between these two subsets.

  const dp = new Array(arr.length + 1).fill(null)
  .map(() => new Array(targetSum + 1).fill(0));

  for(let i = 1; i <= arr.length; i++) {
    for (let s = 1; s <= targetSum; s++) {
      const maxSubsetSumExclNum = dp[i - 1][s];
      const maxSubsetSumInclNum = arr[i - 1] + dp[i - 1][s - arr[i - 1]];

      if (arr[i - 1] > s) dp[i][s] = maxSubsetSumExclNum;
      else dp[i][s] = Math.max(maxSubsetSumExclNum, maxSubsetSumInclNum);
    }
  }

  const subsetSum1 = dp[arr.length][targetSum];
  const subsetSum2 = sum - subsetSum1;

  console.log({subsetSum1, subsetSum2});
  return subsetSum2 - subsetSum1;
}


// #3-1: Tabular 2
// T: O(n * s)
// S: O(n * s)
// where n = input array length, s = total sum of all numbers / 2.

const minSubsetSumDiffTabular = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);
  const targetSum = Math.floor(sum / 2);

  const dp = new Array(arr.length + 1).fill(null)
  .map(() => new Array(targetSum + 1).fill(false));

  for (let i = 0; i <= arr.length; i++) dp[i][0] = true;

  for (let i = 1; i <= arr.length; i++) {
    for (let s = 1; s <= targetSum; s++) {
      if (arr[i - 1] > s) {
        dp[i][s] = dp[i - 1][s];
      }
      else {
        dp[i][s] = dp[i - 1][s] || dp[i - 1][s - arr[i - 1]];
      }
    }
  }

  let subsetSum1 = targetSum;
  while (subsetSum1 > 0 && !dp[arr.length][subsetSum1]) {
    subsetSum1--;
  }

  const subsetSum2 = sum - subsetSum1;

  console.log({subsetSum1, subsetSum2});
  return subsetSum2 - subsetSum1;
}

// #4 Using Set
// T: O(n * s)
// S: O(s) --> the dp set will have at most s + 1 numbers.
// where n = input array length, s = total sum of all numbers / 2.

const minSubsetSumDiffSet = (arr) => {
  let sum = 0;
  arr.forEach(num => sum += num);
  const targetSum = Math.floor(sum / 2);

  let dp = new Set();
  dp.add(0);

  for (let i = 0; i < arr.length; i++) {
    const newDp = new Set();
    for (const subsetSum of dp.values()) {
      newDp.add(subsetSum);

      if (subsetSum + arr[i] <= targetSum) {
        newDp.add(subsetSum + arr[i]);
      }
    }
    dp = newDp;
  }

  const sortedDp = Array.from(dp).sort((a, b) => a - b);
  const subsetSum1 = sortedDp[sortedDp.length - 1]; // the biggest subset sum less than or equal to the target sum (total sum / 2) will be the sum closest to our target sum.
  const subsetSum2 = sum - subsetSum1;
  console.log({subsetSum1, subsetSum2});

  return subsetSum2 - subsetSum1;
}


// TEST
console.log('\nBrute Force 0');
console.log('----------------------');
console.log(minSubsetSumDiffBF0([1, 2, 3, 9]));
console.log(minSubsetSumDiffBF0([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffBF0([1, 3, 100, 4]));
console.log(minSubsetSumDiffBF0([5, 7, 10, 1, 67, 82, 33]));

console.log('\nBrute Force');
console.log('----------------------');

console.log(minSubsetSumDiffBF([1, 2, 3, 9]));
console.log(minSubsetSumDiffBF([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffBF([1, 3, 100, 4]));
console.log(minSubsetSumDiffBF([5, 7, 10, 1, 67, 82, 33]));

console.log('\nMemo 0');
console.log('----------------------');

console.log(minSubsetSumDiffMemo0([1, 2, 3, 9]));
console.log(minSubsetSumDiffMemo0([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffMemo0([1, 3, 100, 4]));
console.log(minSubsetSumDiffMemo0([5, 7, 10, 1, 67, 82, 33]));

console.log('\nMemo');
console.log('----------------------');

console.log(minSubsetSumDiffMemo([1, 2, 3, 9]));
console.log(minSubsetSumDiffMemo([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffMemo([1, 3, 100, 4]));
console.log(minSubsetSumDiffMemo([5, 7, 10, 1, 67, 82, 33]));

console.log('\nTabular 0');
console.log('----------------------');

console.log(minSubsetSumDiffTabular0([1, 2, 3, 9]));
console.log(minSubsetSumDiffTabular0([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffTabular0([1, 3, 100, 4]));
console.log(minSubsetSumDiffTabular0([5, 7, 10, 1, 67, 82, 33]));

console.log('\nTabular');
console.log('----------------------');

console.log(minSubsetSumDiffTabular([1, 2, 3, 9]));
console.log(minSubsetSumDiffTabular([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffTabular([1, 3, 100, 4]));
console.log(minSubsetSumDiffTabular([5, 7, 10, 1, 67, 82, 33]));

console.log('\nSet');
console.log('----------------------');

console.log(minSubsetSumDiffSet([1, 2, 3, 9]));
console.log(minSubsetSumDiffSet([1, 2, 7, 1, 5]));
console.log(minSubsetSumDiffSet([1, 3, 100, 4]));
console.log(minSubsetSumDiffSet([5, 7, 10, 1, 67, 82, 33]));

