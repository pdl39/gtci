/* Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.

Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target. */

// T: O(n)
// S: O(1)
// where n = array length

const pairWithTargetsum = (arr, targetSum) => {
  let lp = 0, rp = arr.length - 1;

  while (lp < rp) {
    const sum = arr[lp] + arr[rp];

    if (sum === targetSum) return [lp, rp];

    if (sum < targetSum) lp++;
    else rp--;
  }

  return [];
}


// TEST
console.log(pairWithTargetsum([1, 3, 4, 7, 18, 20, 22, 33, 35, 37, 55], 44));
console.log(pairWithTargetsum([1, 3, 4, 7, 18, 20, 22, 33, 35, 37, 55], 88));
console.log(pairWithTargetsum([1, 3, 4, 7, 18, 20, 22, 33, 35, 37, 55], 100));
