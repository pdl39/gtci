/* Given an array of unsorted numbers and a target number, find a triplet in the array whose sum is as close to the target number as possible, return the sum of the triplet. If there are more than one such triplet, return the sum of the triplet with the smallest sum. */

// T: O(n^2) --> O(nlogn + n^2), nlogn for sorting, n^2 for traversePairs, which takes O(n) and is called for each element in the array.
// S: O(n) --> assuming we need to create a new array for sorted array. If we can sort in place, space complexity would be O(1).
// where n = array length

const tripletSumCloseToTarget = (arr, target) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const result = {
    minDiff: Infinity,
    closestSum: Infinity
  };

  for (let i = 0; i < sortedArr.length; i++) {
    // skip duplicates
    if (i > 0 && arr[i] === arr[i - 1]) continue;
    traversePairs(sortedArr, target, arr[i], i + 1, result);

    // if exact target sum is found, break out of the loop and return the result.
    if (result.closestSum === target) break;
  }

  return result.closestSum;
};

const traversePairs = (arr, target, x, lp, result) => {
  let rp = arr.length - 1;

  while (lp < rp) {
    // sum = x + y + z
    const sum = x + arr[lp] + arr[rp];

    if (sum === target) {
      result.closestSum = target;
      return;
    }

    const absDiff = Math.abs(target - sum);

    // Update minDiff and closestSum
    if (absDiff < result.minDiff || (absDiff === result.minDiff && sum < result.closestSum)) {
      result.minDiff = absDiff;
      result.closestSum = sum;
    }

    if (sum < target) lp++;
    else rp--;
  }
}


// TEST
console.log(tripletSumCloseToTarget([-12, 8, -2, 5, -9, 2, 0, 9, 12, 5, -2, 8], 28));
console.log(tripletSumCloseToTarget([-12, 8, -2, 5, -9, 2, 0, 9, 12, 5, -2, 8], 88));
console.log(tripletSumCloseToTarget([-12, 8, -2, 5, -9, 2, 9, 12, 5, -2, 8], 3));
